const tf = require('@tensorflow/tfjs')
const scikitjs = require('scikitjs')
scikitjs.setBackend(tf)

module.exports = {
    prediction: async (bb, tb, age, jk, dataset) => {
        const lr = new scikitjs.DecisionTreeClassifier()
        const split = 0.3
        let [xTrain, xTest, yTrain, yTest] = scikitjs.trainTestSplit(dataset.attributes, dataset.labels, split)
        
        lr.fit(xTrain, yTrain)
        const result = lr.predict([[age, bb, tb, jk]])
        const accuracy = lr.score(xTest, yTest)
        const proba = lr.predictProba([[age, bb, tb, jk]])

        const predict_result = result[0]
        const predict_accuracy = accuracy
        const predict_proba_x = proba[0][0]
        const predict_proba_y = proba[0][1]

        return { predict_result, predict_accuracy, predict_proba_x, predict_proba_y }
    }
}