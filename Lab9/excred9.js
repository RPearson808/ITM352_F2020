while (true) {
    if (controller.move() == false){
        await sleep(150);
        controller.rotate();
        controller.move();
    } else if (Math.floor(Math.random() * 11) <= 5){
        await sleep(150);
        controller.rotate();
    } else if (Math.floor(Math.random() * 11) >= 6){
        await sleep(150);
        controller.move(); 
    } else {
        continue;
    }
}