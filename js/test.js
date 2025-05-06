// const isVerified = true;

// console.log(`${isVerified === true ? "user is verified": "user is not verified" }`);


// time calculation

function getTime(time) {
    const hour = parseInt(time / 3600);
    let remainingSeconds = time % 3600;
    const minutes = parseInt(remainingSeconds / 60);
    remainingSeconds = remainingSeconds % 60;
    return `${hour} hours ${minutes} minutes ${remainingSeconds} seconds`;
}

console.log(getTime(4320));

// const name = "tanvir";

function namePass(name){
    console.log(name)
}

namePass('tanvir');