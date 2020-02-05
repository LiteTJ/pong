class Game
{
    #scale = Math.min(canvas.width, canvas.height) / 24;

    ball;
    barriers = [];
    state;

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
            new Barrier(this.#scale*24 - padding*2, "horizontal",padding, padding, this.#scale/6, ["solid"]),
            new Barrier(this.#scale*24 - padding*2, "vertical",this.#scale*24 - padding, padding, this.#scale/6, ["solid"]),
            new Barrier(this.#scale*24 - padding*2, "horizontal",padding, this.#scale*24 - padding, this.#scale/6, ["harmful"]),
            new Barrier(this.#scale*24 - padding*2, "vertical",padding, padding, this.#scale/6, ["solid"])
        );
    }

    init()
    {
        this.ball.init();
        this.state = "playing";
    }

    tick()
    {
        //Business Logic
        this.player.tick();
        this.ball.tick(this.boxes);

        if(!this.ball.alive)
        {
            this.state = "game over";
        }

        //GUI
        this.barriers.forEach(barrier => {
            barrier.draw();
        });

        this.player.draw();
        this.ball.draw();
    }
}