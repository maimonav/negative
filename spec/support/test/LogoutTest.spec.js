describe("LogoutTest", () => {
    let user;
    let correctUserName;
    let correctPassword;
    const User = require("../../../server/src/main/User");
    const CinemaSystem = require("../../../server/src/main/CinemaSystem");
    const ServiceLayer = require("../../../server/src/main/ServiceLayer");
    let servicelayer;

    let cinemaSystem;

    beforeEach(() => {
        correctUserName = "yuval";
        correctPassword = "123456";
        user = new User(1, correctUserName, correctPassword);
        // user.isLoggedin = true;
        cinemaSystem = new CinemaSystem();
        cinemaSystem.users.set(1, user);
        servicelayer = new ServiceLayer();
        servicelayer.users.set(correctUserName, user.id);
    });
    it('UnitTest-logout Test on class User', () => {
        expect(user.logout()).toBe('The user isn\'t connected');
        user.isLoggedin = true;
        expect(user.logout()).toBe('Logout success');

    });

    it('UnitTest-logout Test on class CinemaSystem', () => {
        spyOn(user, 'logout').and.returnValue('dummy');
        const wrongid = 'a';
        expect(cinemaSystem.logout(wrongid)).toBe("The user isn't exists");
        expect(cinemaSystem.logout(user.id)).toBe('dummy');

    });

    it('UnitTest-logout Test on class ServiceLayer', () => {
        spyOn(cinemaSystem, 'logout').and.returnValue('dummy');
        servicelayer.cinemaSystem = cinemaSystem;
        const wrongUserName = "yubal";
        expect(servicelayer.logout(wrongUserName, correctPassword)).toBe("Incorrect user name.");
        expect(servicelayer.logout(correctUserName, correctPassword, user.id)).toBe('dummy');

    });

    it('integration-logout Test on class User', () => {
        expect(user.logout()).toBe('The user isn\'t connected');
        user.isLoggedin = true;
        expect(user.logout()).toBe('Logout success');
        expect(user.logout()).toBe('The user isn\'t connected');

    });

    it('integration-logout Test on class CinemaSystem', () => {
        user.isLoggedin = true;
        const wrongid = 'a';
        expect(cinemaSystem.logout(wrongid)).toBe("The user isn't exists");
        expect(cinemaSystem.logout(user.id)).toBe('Logout success');

    });

    it('integration-logout Test on class ServiceLayer', () => {
        servicelayer.cinemaSystem = cinemaSystem;
        const wrongUserName = "yubal";
        expect(servicelayer.logout(wrongUserName, correctPassword)).toBe("Incorrect user name.");
        user.isLoggedin = true;
        expect(servicelayer.logout(correctUserName, correctPassword, user.id)).toBe('Logout success');

    });
})