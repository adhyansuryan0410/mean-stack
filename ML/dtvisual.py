from sklearn.tree import DecisionTreeClassifier
from sklearn import datasets
from IPython.display import Image
import pydotplus

iris = datasets.load_iris()
X = iris.data
y = iris.target

clf = DecisionTreeClassifier(random_state=0)
model = clf.fit(X, y)

dot_data = tree.export_graphviz(clf, out_file=None, feature_names=iris.feature_names,
                                class_names=iris.target_names)

graph = pydotplus.graph_from_dot_data(dot_data)
Image(graph.create_png())