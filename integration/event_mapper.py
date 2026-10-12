
ANIMAL_CLASSES = {
    "Rhino", "Badger", "Bison", "Black_Bear", "Brown_Bear",
    "Cats", "Cow", "Crocodile", "Deer", "Dog", "Elephant",
    "Fox", "Gorilla", "Hippopotamus", "Hyena", "Jaguar",
    "Kangaroo", "Leopard", "Lion", "Moose", "Nilgai",
    "Panther", "Polar_Bear", "Porcupine", "Puma", "Tiger",
    "Wild_Boar", "Wolf", "Locust", "Pig", "Rat", "Mouse",
    "Caterpillar", "Baboon", "Rabbit",
}


def map_detection(d):
    animal_class = d["class"]

    return {
        "object_class": animal_class,
        "confidence": float(d["confidence"]),
        "zone": "zone-1",
        "is_animal": animal_class in ANIMAL_CLASSES,
    }
