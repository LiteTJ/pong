class Powerup extends Sprite
{
    #IDS = ["speed"];

    #id;
    #properties = ["powerup"];

    constructor(width)
    {
        super(img.null, width, width, 100, 100);
        this.#id = this.#IDS[Math.floor(Math.random() * this.#IDS.length)];
        this._updateImage();
    }

    get properties() { return this.#properties; }

    get hitbox()
    {
        return new SAT.Box(new SAT.Vector(this.x, this.y), this.width, this.height).toPolygon();
    }

    _updateImage()
    {
        if(this.#id === "speed") this.setImage(img.powerup_speed);
    }

    activatePowerup(ball)
    {
        //Speed boost test for 5 seconds
        ball.speed *= 2;
        setTimeout(() => {
            ball.speed /= 2;
        }, 5000);

        this.#properties.push("inactive");
    }
}