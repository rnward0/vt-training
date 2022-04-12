#![feature(proc_macro_hygiene, decl_macro)]

#[macro_use]
extern crate rocket;
extern crate rocket_contrib;

mod planets;
mod auth;

//Main routes and functions
#[get("/")]
fn index() -> &'static str {
    "Type /is/<any planet> to find out if it's a planet in the solar system!"
}

//  curl --header "x-api-key: super_secure_key" http://localhost:8000/is/<planet>

#[get("/is/<planet>")]
fn is_planet(_key: auth::ApiKey, planet: String) -> &'static str {
    if planets::find_planet(planet) {
        return "This is a planet!";
    } else {
        return "This is not a planet!";
    }
}

//  curl --header "x-api-key: super_secure_key" http://localhost:8000/how-far/<planet>

// #[get("/how-far/<planet>")]
// fn how_far(_key: auth::ApiKey, planet: String) -> String {
//     if planets::find_planet(&planet) {
//         let distance: i32 = planets::how_far(&planet);
//         return format!("This planet is {}km away from us!", distance);
//     } else {
//         return "This is not a planet!".to_string();
//     }
// }

fn main() {
    rocket::ignite()
        .mount("/", routes![is_planet, index])
        .launch();
}
