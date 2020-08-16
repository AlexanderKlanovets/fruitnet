# FruitNet - a web application for fruits' freshness classification

## Description

FruitNet is a web application, implemented with Python (Flask framework), which uses a convolutional neural network on the back-end to perform fruit classification. The system is able to distinguish 6 classes of fruits: fresh/rotten apples, fresh/rotten oranges and fresh/rotten bananas. The user is able to interact with the app by uploading images or by showing the fruits to the web-camera. The app uses Web Speech API to make the experience more interactive and fun.

**The application is available at:** https://fruitnet.herokuapp.com

### Dependencies

For this project, the following tools were used:
- [Tensorflow 2](https://www.tensorflow.org/install) for building and training the model;
- [Numpy](https://numpy.org/) for working with arrays;
- [Matplotlib](https://matplotlib.org/) for visualizing the data;
- [Flask](https://flask.palletsprojects.com/en/1.1.x/) for implementing server side;
- HTML5, CSS3, JavaScript (with Web Speech API and [particles.js](https://vincentgarreau.com/particles.js/)) on the front-end.

### Dataset for training

The dataset used for training and evaluating the model: [Fruits fresh and rotten for classification](https://www.kaggle.com/sriramr/fruits-fresh-and-rotten-for-classification) by Sriram Reddy Kalluri. The obtained model has achieved 99% accuracy on the test set. 

### Network implementation

The network itself was implemented using **transfer learning**. The MobileNet V2 model developed at Google was used as a base model for feature extraction from our data. A custom classification layer was added on top and trained separately. You can learn more about this approach [here](https://www.tensorflow.org/tutorials/images/transfer_learning).

## Install locally

To install and run locally in a production mode:

```bash
git clone https://github.com/AlexanderKlanovets/fruitnet
pip install -r requirements.txt
python app.py
```