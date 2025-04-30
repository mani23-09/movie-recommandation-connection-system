import pandas as pd
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import make_pipeline
from sklearn.linear_model import ElasticNet
from modules.get_season import get_season, get_date_season

# Load dataset
data = pd.read_csv('./data_set/rotten_tomato_movies2.csv', encoding='latin1')

# Handle missing values
data['movie_info'] = data['movie_info'].fillna('')
data['genre'] = data['genre'].fillna('Unknown')
data['directors'] = data['directors'].fillna('Unknown')
data['writers'] = data['writers'].fillna('Unknown')
data['studio_name'] = data['studio_name'].fillna('Unknown')
data['in_theaters_date'] = data['in_theaters_date'].fillna('Unknown')

# Add season information
data['season'] = get_season(data['in_theaters_date'])

# Fill remaining missing values
data['runtime_in_minutes'] = data['runtime_in_minutes'].fillna(data['runtime_in_minutes'].median())
data['tomatometer_rating'] = data['tomatometer_rating'].fillna(data['tomatometer_rating'].median())
data['tomatometer_count'] = data['tomatometer_count'].fillna(data['tomatometer_count'].median())

# Map rating labels to numerical values
grade_mapping = {
    'PG': 0,
    'R': 1,
    'NR': 2,
    'G': 3,
    'PG-13': 4
}
data['grade'] = data['grade'].map(grade_mapping)

# Drop rows with NaN in 'audience_rating'
data = data.dropna(subset=['audience_rating'])

# Define features (X) and target (y)
X = data.drop('audience_rating', axis=1)
y = data['audience_rating']

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Define transformers
categorical_features = ['genre', 'grade', 'directors', 'writers', 'studio_name', 'season']
text_features = ['movie_info']
numerical_features = ['runtime_in_minutes', 'tomatometer_rating', 'tomatometer_count']

# Pipelines
categorical_transformer = OneHotEncoder(handle_unknown='ignore')
text_transformer = TfidfVectorizer(max_features=100)
numerical_transformer = StandardScaler()

# Combine preprocessors using ColumnTransformer
preprocessor = ColumnTransformer(
    transformers=[
        ('cat', categorical_transformer, categorical_features),
        ('text_info', text_transformer, 'movie_info'),
        ('num', numerical_transformer, numerical_features)
    ],
    remainder='drop'  # Drop any columns not specified in transformers
)

# Create pipeline with preprocessor and ElasticNet
model = make_pipeline(preprocessor, ElasticNet(random_state=42))

# Train the model
model.fit(X_train, y_train)

# Predict on the test set
y_pred = model.predict(X_test)

# Calculate metrics
mae = mean_absolute_error(y_test, y_pred)
mse = mean_squared_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)
accuracy_percentage = r2 * 100

print(f"Mean Absolute Error: {mae:.2f}")
print(f"Mean Squared Error: {mse:.2f}")
print(f"R^2 Score: {r2:.2f}")
print(f"Model Accuracy: {accuracy_percentage:.2f}%")

# Define a function to take user input
def get_movie_data():
    try:
        movie_info = input("Enter movie information: ")
        grade_input = input("Enter Grade (PG: 0, R: 1, NR: 2, G: 3, PG-13: 4): ").upper()
        genre = input("Enter genre: ")
        directors = input("Enter directors: ")
        writers = input("Enter writers: ")
        studio_name = input("Enter studio name: ")
        in_theaters_date = input("Enter in-theaters date (YYYY-MM-DD): ")
        runtime_in_minutes = int(input("Enter runtime in minutes: "))
        tomatometer_rating = float(input("Enter tomatometer rating: "))
        tomatometer_count = int(input("Enter tomatometer count: "))
        
        # Map the grade input to the grade_mapping
        grade = grade_mapping.get(grade_input, -1)
        if grade == -1:
            print("Invalid grade entered.")
            return None
        
        # Derive season from the input date
        season = get_date_season(in_theaters_date)
        
        return {
            'movie_info': movie_info,
            'grade': grade,
            'genre': genre,
            'directors': directors,
            'writers': writers,
            'studio_name': studio_name,
            'runtime_in_minutes': runtime_in_minutes,
            'tomatometer_rating': tomatometer_rating,
            'tomatometer_count': tomatometer_count,
            'season': season
        }
    except ValueError as e:
        print(f"Invalid input: {e}")
        return None

# Get user input
user_movie_data = get_movie_data()

if user_movie_data:
    # Align input with model features
    required_columns = categorical_features + text_features + numerical_features
    user_movie_data = {col: user_movie_data.get(col, '') for col in required_columns}

    # Predict audience rating
    predicted_rating = model.predict(pd.DataFrame([user_movie_data]))
    print(f"Predicted Audience Rating: {predicted_rating[0]:.2f}")
else:
    print("Failed to collect valid movie data.")
