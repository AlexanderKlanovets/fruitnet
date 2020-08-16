import tensorflow as tf


class FruitNet:
    def __init__(self, model_config_path):
        self.model = tf.keras.models.load_model(model_config_path)

    def predict(self, img_file):
        labels = ['fresh apple', 'fresh banana', 'fresh orange', \
                  'rotten apple', 'rotten banana', 'rotten orange']

        img_tensor = tf.image.decode_image(img_file)
        img_resized = tf.image.resize(img_tensor, [160, 160])
        img_final = tf.expand_dims(img_resized, 0)

        y_probs = self.model.predict(img_final[:,:,:,:3])
        y_label = y_probs.argmax(axis=-1)

        label = labels[y_label[0]]
        percentage = format(y_probs.max() * 100, '.1f')

        return label, percentage
