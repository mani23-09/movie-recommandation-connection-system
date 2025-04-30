import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error, r2_score
from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer

# Step 1: Load the Dataset
data = pd.read_csv("./data_set/rotten_tomato_movies.csv")

# Step 2: Preprocess the Data
# Selecting features (X) and target (y)
X = data.iloc[:, :-1]
y = data.iloc[:, -1]
print(X,y)

# Convert dates to datetime format
X['in_theaters_date'] = pd.to_datetime(X['in_theaters_date'])
X['on_streaming_date'] = pd.to_datetime(X['on_streaming_date'])

# Feature engineering: Days between release and streaming
X['days_between_release_and_streaming'] = (X['on_streaming_date'] - X['in_theaters_date']).dt.days
X.drop(['in_theaters_date', 'on_streaming_date'], axis=1, inplace=True)

# Step 3: Define Preprocessing
# Numerical and categorical columns
numeric_features = ['runtime_in_minutes', 'tomatometer_rating', 'tomatometer_count', 'days_between_release_and_streaming']
categorical_features = ['genre', 'directors', 'writers', 'studio_name']

# Preprocessing pipelines
numeric_transformer = SimpleImputer(strategy='mean')
categorical_transformer = Pipeline(steps=[
    ('imputer', SimpleImputer(strategy='constant', fill_value='missing')),
    ('onehot', OneHotEncoder(handle_unknown='ignore'))
])

preprocessor = ColumnTransformer(
    transformers=[
        ('num', numeric_transformer, numeric_features),
        ('cat', categorical_transformer, categorical_features)
    ]
)

# Step 4: Build the Model Pipeline
model = Pipeline(steps=[
    ('preprocessor', preprocessor),
    ('regressor', RandomForestRegressor(n_estimators=100, random_state=42))
])

# Step 5: Split Data into Training and Testing Sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Step 6: Train the Model
model.fit(X_train, y_train)

# Step 7: Evaluate the Model
y_pred = model.predict(X_test)
mse = mean_squared_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)

print(f"Mean Squared Error: {mse:.2f}")
print(f"R² Score: {r2:.2f}")

# Step 8: Save the Model (Optional)
import joblib
joblib.dump(model, 'movie_rating_predictor.pkl')
