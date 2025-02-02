import "@typespec/http";
import "@typespec/openapi3";

using TypeSpec.Http;
@service({
  title: "express-api",
})
@server("http://localhost:3000", "local")
namespace ExpressApiSample;

@example(#{ app: true, mongo: true })
model HealthResponse {
  app: boolean;
  mongo: boolean;
}

@error
model Error {
  code: int32;
  errorMessage: string;
}

@route("health")
@tag("Health")
interface Health {
  @get health(): HealthResponse | Error;
}

@example(#{
  _id: "66904193dc46a4fe8ee4c27f",
  email: "cskoggins2m@ucla.edu",
  first_name: "Clea",
  id: 95,
  last_name: "Skoggins",
})
model Renter {
  @key _id: string;
  id: int32;
  first_name: string;
  last_name: string;
  email: string;
}

@route("renters")
@tag("Renters")
interface Renters {
  @get getAllRenters(): Renter[] | Error;
  @get getRenterById(@path id: string): Renter | Error;
}

model Widget {
  @visibility("read", "update")
  @path
  id: string;

  weight: int32;
  color: "red" | "blue";
}
