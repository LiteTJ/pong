class Game
{
    #scale = Math.min(canvas.width, canvas.height) / 24;

    ball;
    barriers = [];

    constructor()
    {
        this._createBarriers(0);

        this.ball = new Ball(this.#scale/2, this.#scale*0.3);
        this.player = new Paddle(this.#scale*4, canvas.width/2, this.playerY);
    }

    get scale() { return this.#scale; }

    get playerY()
    {
        return canvas.height - this.#scale*4;
    }

    get boxes()
    {
        let boxes = [];

        boxes.push(this.player, this.barriers);

        return [].concat(...boxes);
    }

    _createBarriers(padding)
    {
        this.barriers.push(
            new Barrier(this.#scale*24 - padding*2, "horizontal", padding, padding, this.#scale/6),
            new Barrier(this.#scale*24 - padding*2, "vertical", this.#scale*24 - padding, padding, this.#scale/6),
            new Barrier(this.#scale*24 - padding*2, "horizontal", padding, this.#scale*24 - padding, this.#scale/6),
            new Barrier(this.#scale*24 - padding*2, "vertical", padding, padding, this.#scale/6)
        );
    }

    init()
    {
        this.ball.x = canvas.width/2 - this.ball.width/2;
        this.ball.y = canvas.height/4;
    }

    tick()
    {
        //Business Logic
        this.player.tick();
        this.ball.tick(this.boxes);

        //GUI
        this.barriers.forEach(barrier => {
            barrier.draw();
        });

        this.player.draw();
        this.ball.draw();
    }
}