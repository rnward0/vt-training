use rocket::{http::Status, request, request::FromRequest, request::Outcome, Request};

pub struct ApiKey(String);

fn is_valid(key: &str) -> bool {
    key == "super_secure_key"
}

#[derive(Debug)]
pub enum ApiKeyError {
    Missing,
    Invalid,
}

impl<'a, 'r> FromRequest<'a, 'r> for ApiKey {
    type Error = ApiKeyError;
    fn from_request(request: &'a Request<'r>) -> request::Outcome<Self, Self::Error> {
        match request.headers().get_one("x-api-key") {
            Some(key) => {
                if is_valid(key) {
                    Outcome::Success(ApiKey(key.to_string()))
                } else {
                    Outcome::Failure((Status::BadRequest, ApiKeyError::Invalid))
                }
            },
            None => Outcome::Failure((Status::BadRequest, ApiKeyError::Missing))
        }
    }
}