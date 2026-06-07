document
.getElementById("loginForm")
.addEventListener("submit", async (e) => {

    e.preventDefault();

    const username =
    document.getElementById("username").value;

    const password =
    document.getElementById("password").value;

    try {

        const response = await fetch(
            "http://localhost:8080/auth/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username,
                    password
                })
            }
        );

        const token = await response.text();

        if(token.includes("."))
        {
            localStorage.setItem(
                "token",
                token
            );

            window.location.href =
            "admin.html";
        }
        else
        {
            alert(token);
        }

    } catch(error) {

        console.error(error);

        alert("Server Connection Error");
    }
});