while(true) {
    await sleep(200);
    controller.move();
    if (controller.move() == false) {
        controller.rotate(90);
        continue;
    }
}