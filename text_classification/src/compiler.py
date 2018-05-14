import pandas as pd
import numpy as np 

results_df = pd.read_json('./results-parsed.json', encoding='utf-8')
topics_df = pd.read_json('./topics.json', encoding='utf-8')
weight_vectors = []
stds = []
means = []
distances = []

for i in range(0, len(topics_df)):
  filtered_results = results_df[((results_df.Frequencias.notnull()) & (results_df.Frequencias[i] > 0))]
  frequency = filtered_results.loc[:, 'Frequencias'].map(lambda f: f[str(i)])
  frequency = frequency.dropna()
  weight_vectors.append(frequency.values)
  stds.append(frequency.std())
  means.append(frequency.mean())

topics_df['weight_vector'] = weight_vectors
topics_df['std'] = stds
topics_df['mean'] = means

for i in range(0, len(results_df)):
  frequencies = results_df.iloc[i]['Frequencias']
  for j in range(0, len(frequencies)):
    if(frequencies[j] > 0): 
      topic_std = topics_df.iloc[frequencies[j]]['std']
      topic_mean = topics_df.iloc[frequencies[j]]['mean']
      distance = abs((frequencies[j] - topic_mean) / topic_std)
      frequencies[j]['distance'] = distance

for i in range(0, len(topics_df)):
  

print topics_df