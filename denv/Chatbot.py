from langchain_ollama import OllamaLLM
from langchain_core.prompts import ChatPromptTemplate
model = OllamaLLM(model="llama3")
res=model.invoke(input = "Hello")
print(res)