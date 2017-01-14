import IoC from 'AppIoC';

export const guestUser = () => {
  // Mocking user model to have expected behavior in all our app
  return {
    isGuest: () => true,
    isAdmin: () => false,
    isBlogger: () => false,
    isCustomer: () => false,
    checkId: () => false,

    firstName: "Guest",
    lastName: "User",
    profileImage: {
      src: 'https://images.cdn.circlesix.co/image/2/100/100/5/assets/img/user.jpg',
      versions: [{
        width: 100,
        height: 100,
        src: 'https://images.cdn.circlesix.co/image/2/100/100/5/assets/img/user.jpg',
      }]
    }
  };
}

IoC.callable('guestUser', [], guestUser);
