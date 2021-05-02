from keras_preprocessing import sequence
from nltk.stem.lancaster import LancasterStemmer
import tensorflow as tf
import nltk
import json
import numpy as np

stemmer = LancasterStemmer()

MAX_LEN = 15

with open("./HTML/PROJECT/intents.json", "r") as file:
    data = json.load(file)

words = []
labels = []
docs_x = []
docs_y = []
context = {}

for intent in data["intents"]:
    for pattern in intent["patterns"]:
        wrds = nltk.word_tokenize(pattern)
        words.extend(wrds)
        docs_x.append(wrds)
        docs_y.append(intent["tag"])

    if intent["tag"] not in labels:
        labels.append(intent["tag"])

words = [stemmer.stem(w.lower()) for w in words if w not in "?"]
words = sorted(list(set(words)))
labels = sorted(labels)

training = []
output = []

vocab = sorted(set(words))
vocab_out = sorted(set(labels))

# Creating a mapping from unique characters to indices
char2idx = {u: i+1 for i, u in enumerate(vocab)}
char2idx_out = {u: i for i, u in enumerate(vocab_out)}


def text_to_int(words_t, vocab):
    return [vocab[c] for c in words_t if c in vocab]


for doc in docs_x:
    wrds = [stemmer.stem(w) for w in doc if w not in '?']
    training.append(text_to_int(wrds, char2idx))

output.append(text_to_int(docs_y, char2idx_out))
training = sequence.pad_sequences(training, MAX_LEN)

training = np.array(training)
output = np.array(output).flatten()

model = tf.keras.Sequential([
    tf.keras.layers.Embedding(len(vocab)+1, 32),
    tf.keras.layers.LSTM(32),
    tf.keras.layers.Dense(len(output), activation="softmax")
])

model.compile(loss="sparse_categorical_crossentropy", optimizer="rmsprop")
model.fit(training, output, epochs=1000)
model.save("zatrobot.h5")

print(labels)
print(char2idx)


# def chat(userID='123'):
#     print("Start talking with the bot! (type 'quit' to stop)")
#     while True:
#         inp = input("You: ")
#         inp_words = nltk.word_tokenize(inp)
#         inp_words = [stemmer.stem(word.lower()) for word in inp_words]
#         inp_words_as_int = [text_to_int(inp_words)]
#         inp_words_as_int = sequence.pad_sequences(inp_words_as_int, MAX_LEN)
#         # print(len(inp_words_as_int))
#         # print(len(inp_words_as_int[0]))
#         # print(inp_words_as_int)
#         results = model.predict(inp_words_as_int)[0]

#         results_index = np.argmax(results)
#         # print(labels)
#         tag = labels[results_index]
#         result_list = [(tag, results[results_index])]

#         if result_list:
#             for tg in data["intents"]:
#                 if tg['tag'] == tag:
#                     if 'context_set' in tg:
#                         context[userID] = tg['context_set']
#                         print(context)
#                     if userID in context and 'context_filter' in tg and tg['context_filter'] == context[userID]:
#                         print('context:', tg['context_set'])
#                         print(random.choice(tg["responses"]))
#                         print(result_list[0][1])
#                         context.pop()
#                     elif not 'context_filter' in tg:
#                         print(random.choice(tg["responses"]))
#                         print(result_list[0][1])


# chat()
