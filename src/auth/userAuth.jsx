import { API } from "../config";

export const signup = (user) => {
    return fetch(`${API}/signup`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },

        body: JSON.stringify(user),
    })
        .then((res) => {
            return res.json();
        })
        .catch((err) => console.log(err));
};

export const signin = (user) => {
    return fetch(`${API}/signin`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },

        body: JSON.stringify(user),
    })
        .then((res) => {
            return res.json();
        })
        .catch((err) => console.log(err));
};

export const signout = (next) => {
    if (typeof window !== undefined) {
        localStorage.removeItem("user-jwt");
        next();

        return fetch(`${API}/signout`, {
            method: "GET",
        })
            .then((res) => console.log("signout", res))
            .catch((err) => console.log(err));
    }
};

export const authenticate = (data, next) => {
    if (typeof window !== undefined) {
        localStorage.setItem("user-jwt", JSON.stringify(data));
        next();
    }
};

export const isAuthenticated = () => {
    if (typeof window == "undefined") {
        return false;
    }

    if (localStorage.getItem("user-jwt")) {
        return JSON.parse(localStorage.getItem("user-jwt"));
    } else {
        return false;
    }
};
