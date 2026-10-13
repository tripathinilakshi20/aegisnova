
ANIMAL_CLASSES = {
    "rhino",
    "badger",
    "bison",
    "black_bear",
    "brown_bear",
    "cats",
    "cow",
    "crocodile",
    "deer",
    "dog",
    "elephant",
    "fox",
    "gorilla",
    "hippopotamus",
    "hyena",
    "jaguar",
    "kangaroo",
    "leopard",
    "lion",
    "moose",
    "nilgai",
    "panther",
    "polar_bear",
    "porcupine",
    "puma",
    "python",
    "tiger",
    "wild_boar",
    "wolf",
}


def map_detection(d):
    animal_class = str(d["class"]).strip()
    normalized_class = animal_class.lower()

    return {
        "object_class": animal_class,
        "confidence": float(d["confidence"]),
        "zone": "zone-1",
        "is_animal": normalized_class in ANIMAL_CLASSES,
    }
