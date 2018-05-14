
# encoding=utf8
import sys
reload(sys)
sys.setdefaultencoding('utf8')

import pandas as pd
import numpy as np
from nltk.corpus import stopwords

#, encoding='utf-8'
df = pd.read_excel('../data/chunk_10000.csv', encoding='utf-8')
#df.set_axis(['Numero_Chamado', 'b', 'c', 'd', 'e'], axis='columns', inplace=False)



import re
import nltk
from pandas import ExcelWriter
from nltk.corpus import stopwords
from nltk.stem import SnowballStemmer
from nltk.stem import rslp
#from sklearn.feature_extraction.text import TfidVectorizer
#from sklearn.svm import LinearSVC
#from sklearn.pipeline import Pipeline
from unicodedata import normalize

df.columns = ['Numero_Chamado', 'Data_abertura', 'Data_fechamento', 'Status', 'Usuario que registrou', 'Usuario solicitante', 'Descricao do Chamado', 'Descricao_solucao', 'Categoria', 'Grupo solucionador', 'Analista Resolvedor', 'Canal de abertura']

stemmer = nltk.stem.RSLPStemmer()
words = nltk.corpus.stopwords.words('portuguese')
for i in range(0, len(df)):
    df.loc[i, 'Descricao do Chamado'] = normalize('NFKD', str(df.iloc[i]['Descricao do Chamado']).decode('utf-8')).encode('ascii', 'ignore')

df['cleaned'] = df['Descricao do Chamado'].apply(lambda x: " ".join([stemmer.stem(i) for i in re.sub("[^a-zA-Z]", " ", x).split() if i not in words]).lower())





names_df = pd.read_csv('nomes-unisex.csv')

lower_names = []

for i in range(0, len(names_df)):
    lower_names.append(names_df.iloc[i]['Nome'].lower())

for i in range(0, len(df)):
    sentence = df.iloc[i]['Descricao do Chamado'].split()
    for word in sentence:
        if(word.lower() in lower_names):
            df.loc[i, 'Descricao do Chamado'] = df.iloc[i]['Descricao do Chamado'].replace(word, '')


df.columns = ['Numero_Chamado', 'Data_abertura', 'Data_fechamento', 'Status', 'Usuario que registrou', 'Usuario solicitante', 'Descrição do Chamado', 'Descricao_solucao', 'Categoria', 'Grupo solucionador', 'Analista Resolvedor', 'Canal de abertura', 'Cleaned']

writer = ExcelWriter('cleaned.xlsx',options={'encoding':'utf-8'})
df.to_excel(writer)
writer.save()
df.to_csv('cleaned.csv', mode='w', header=True)
