pub fn find_planet(planet: String) -> bool {
    let planets: [String; 8] = [
        "earth".to_string(),
        "jupiter".to_string(),
        "saturn".to_string(),
        "mercury".to_string(),
        "mars".to_string(),
        "venus".to_string(),
        "neptune".to_string(),
        "uranus".to_string(),
    ];
    if planets.contains(&planet) {
        return true;
    } else {
        return false;
    }
}