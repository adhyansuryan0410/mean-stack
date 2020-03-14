import pandas as pd
import numpy as np
import matplotlib
import matplotlib.pyplot as plt
import pydotplus
from six import StringIO
from IPython.display import Image
from sklearn.tree import DecisionTreeRegressor, export_graphviz, DecisionTreeClassifier

matplotlib.use('TKAgg')
df = pd.read_csv('data/Hitters.csv', index_col = 0)
print(df.head())

df = df.dropna()

fig_size = plt.rcParams["figure.figsize"]
plt.rcParams["figure.figsize"] = (14,10)

font = {'family': 'serif',
        'color':  'k',
        'weight': 'normal',
        'size': 16,
        }

plt.scatter(x=df['Years'], y=df['Hits'], c=df['Salary'], s=40, cmap='inferno')
plt.title("Can Salary be predicted?",
          fontdict=font)
plt.xlabel("Years", fontdict=font)
plt.ylabel("Hits", fontdict=font)
color_bar = plt.colorbar()
color_bar.ax.set_ylabel('Salary (in thousands of dollars)')
plt.show()

plt.hist(df['Salary'])
plt.hist(np.log(df['Salary']))

X = df[['Years', 'Hits']]
y = np.log(df['Salary'])
tree = DecisionTreeRegressor(max_leaf_nodes=3, random_state=0)
tree.fit(X, y)

dot_data = StringIO()

export_graphviz(tree, feature_names=['Years', 'Hits'],
                      out_file=None,
                      filled=True,
                      rounded=True,
                      special_characters=True)
graph = pydotplus.graph_from_dot_data(dot_data)
nodes = graph.get_node_list()

Image(graph.write_png('python_decision_tree.png'))

print('${:,.0f}'.format(1000*np.exp(5.107)))
print('${:,.0f}'.format(1000*np.exp(6.74)))

df.plot('Years', 'Hits', kind='scatter', color='orange', figsize=(7,6))
plt.xlim(0,25)
plt.ylim(bottom=-5)
plt.xticks([1, 4.5, 24])
plt.yticks([1, 117.5, 238])
plt.vlines(4.5, ymin=-5, ymax=250, colors="green")
plt.hlines(117.5, xmin=4.5, xmax=25, colors="green")
plt.annotate('R1', xy=(1.5,117.5), fontsize='xx-large')
plt.annotate('R2', xy=(11.5,60), fontsize='xx-large')
plt.annotate('R3', xy=(11.5,170), fontsize='xx-large')
plt.show()

def classification_error(p):
    return 1 - np.max([p, 1 - p])

def gini(p):
    return 2*(p)*(1 - p)

def entropy(p):
    return (p*np.log((1-p)/p) - np.log(1 - p)) / (2*np.log(2))
x = np.arange(0.0, 1.0, 0.01)
class_error_vals = [classification_error(i) for i in x]
gini_vals = gini(x)
entropy_vals = [entropy(i) if i != 0 else None for i in x]
fig = plt.figure()
ax = plt.subplot()

for j, lab, c, in zip(
    [class_error_vals, gini_vals, entropy_vals],
    ['Class. Error Rate', 'Gini Index', 'Cross-entropy'],
    ['red', 'blue', 'green']):
    line = ax.plot(x, j, label=lab, linestyle='-', lw=5, color=c)

ax.legend(loc='upper right', fancybox=True, shadow=False)

plt.ylim([0, 0.52])
plt.xlabel('p')
plt.ylabel('Impurity Index')
plt.show()