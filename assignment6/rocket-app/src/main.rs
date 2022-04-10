#![feature(proc_macro_hygiene, decl_macro)]

#[macro_use]
extern crate rocket;

mod planets;

#[get("/")]
fn index() -> &'static str {
    "Type /is/<any planet> to find out if it's a planet in the solar system!"
}

#[get("/is/<planet>")]
fn is_planet(planet: String) -> &'static str {
    if find_planet(planet) {
        return "This is a planet!";
    } else {
        return "This is not a planet!";
    }
}

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

fn main() {
    rocket::ignite()
        .mount("/", routes![is_planet, index])
        .launch();
}
