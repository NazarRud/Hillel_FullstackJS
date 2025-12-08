const { isValidEmail, isValidUrl } = require("../js/main");

describe("function isValidEmail", () => {
    const validEmails = [
        "example@example.com",
        "user@example.com",
        "john.doe@gmail.com",
        "a@b.cd",
        "user123@service.co",
        "my.name@sub.domain.com",
        "name.surname@mail.server.online",
        "USER@EXAMPLE.COM",
        "john01@domain123.net",
        "u1.s2.t3@sub1.sub2.host.info",
        "simple@simple.ua",
        "many.parts.in.name@multi.part.domain.com",
    ];

    const invalidEmails = [
        "user",
        "user@",
        "@example.com",
        "user@domain",
        "user@domain.c",
        "user@domain.c9",
        "user..name@example.com",
        ".username@example.com",
        "username.@example.com",
        "user_name@example.com",
        "user-name@example.com",
        "user+name@example.com",
        "user@example-domain.com",
        "user@example..com",
        "user@example.c_m",
        "user@example.1a",
        "user@sub..example.com",
        "user@.example.com",
        "user@example.com.",
    ];

    test.each(validEmails)("Valid email: %s", (email) => {
        expect(isValidEmail(email)).toBeTruthy();
    });

    test.each(invalidEmails)("Invalid email: %s", (email) => {
        expect(isValidEmail(email)).toBeFalsy();
    });
});

describe("function isValidUrl", () => {
    const validUrls = [
        "https://www.example.com",
        "http://example.com",
        "https://example.com",
        "example.com",
        "EXAMPLE.COM",
        "www.example.com",
        "http://www.example.com",
        "https://sub.domain.com",
        "sub.domain.example.com",
        "example.co",
        "mail.server.online",
        "http://example.com:80",
        "https://www.example.com:443",
        "sub1.sub2.host.info:3000",
    ];

    const invalidUrls = [
        "http://example",
        "http://example.c",
        "http://example.c9",
        "ftp://example.com",
        "://example.com",
        "http://exa_mple.com",
        "http://my-domain.com",
        "http://example.com/",
        "https://example.com/path",
        "https://example.com?query=1",
        "https://example.com#hash",
        "http:///example.com",
        "http://.example.com",
        "http://example..com",
        "http://example.com:abc",
    ];

    test.each(validUrls)("Valid url: %s", (email) => {
        expect(isValidUrl(email)).toBeTruthy();
    });

    test.each(invalidUrls)("Invalid url: %s", (email) => {
        expect(isValidUrl(email)).toBeFalsy();
    });
});
