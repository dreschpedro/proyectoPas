import { jwtVerify } from "jose";
import { NextResponse } from "next/server";
import { useContext } from "react";
import { UserContext } from "./userContext";


const SECRET_KEY = "lkjadslfk";


export async function middleware(request) {
  const jwt = request.cookies.get("authToken");
  const { setUserData } = useContext(UserContext); // Cambiar el nombre de la variable aquí también
  // this condition avoid to show the login page if the user is logged in
  // if (jwt) {
  //   if (request.nextUrl.pathname.includes("/login")) {
  //     try {
  //       await jwtVerify(jwt, new TextEncoder().encode("secret"));
  //       return NextResponse.redirect(new URL("/dashboard", request.url));
  //     } catch (error) {
  //       return NextResponse.next();
  //     }
  //   }
  // }
  if (!jwt) return NextResponse.redirect(new URL("/login", request.url));

  try {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c3VhcmlvIjoxLCJ1c2VybmFtZSI6ImFkbWluIiwicm9sIjoiYWRtaW4iLCJpYXQiOjE2OTU5OTA4MDQsImV4cCI6MTY5ODU4MjgwNH0.uwiqna0LnnXFO4YQXhH3rHXE4PecT4a8tMzclRtGZjY';

    const { payload } = await jwtVerify(
      jwt.value,
      new TextEncoder().encode(SECRET_KEY)
    );

    console.log({ payload });
    //el redireccionamiento especifico va en el login, ahi tendria que usar el jwt para llevar a una ruta u otra dependiendo del rol
    //para eso voy a necesitar otros usuarios que tengan otros roles
    //y aqui tengo que ver como bloquear las rutas igual dependiendo de su rol


    // Actualizar los datos del usuario en el contexto
    setUserData(payload);

    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL("/inicio", request.url));
  }
}

export const config = {
  matcher: ["/admin/:path*", "/consultor/:path*", "/data-entry/:path*"],
};
