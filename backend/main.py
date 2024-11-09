import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix

# Load the dataset
file_path = 'C:\\Users\nipun\OneDrive\Documents\Desktop\MakeUC\MakeUC2024\data\Phishing_Email copy.csv'
data = pd.read_csv(file_path)

# Clean and preprocess the email text (basic cleaning)
data['Email Text'] = data['Email Text'].str.lower()  # Convert text to lowercase

# Convert the target labels into binary format (Safe Email = 0, Phishing Email = 1)
data['Email Type'] = data['Email Type'].map({'Safe Email': 0, 'Phishing Email': 1})

# Split data into training and testing sets
X = data['Email Text']
y = data['Email Type']
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Vectorize the email text using TF-IDF
vectorizer = TfidfVectorizer(stop_words='english', max_features=1000)
X_train_tfidf = vectorizer.fit_transform(X_train)
X_test_tfidf = vectorizer.transform(X_test)

# Train a Naive Bayes model
model = MultinomialNB()
model.fit(X_train_tfidf, y_train)

# Make predictions on the test set
y_pred = model.predict(X_test_tfidf)

# Evaluate the model
accuracy = accuracy_score(y_test, y_pred)
print(f"Accuracy: {accuracy * 100:.2f}%")
print("\nClassification Report:")
print(classification_report(y_test, y_pred))
print("\nConfusion Matrix:")
print(confusion_matrix(y_test, y_pred))
