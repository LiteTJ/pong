class Powerup extends Sprite
{
    #IDS = ["speed"];

    #duration = 5000;
    #id;
    #properties = ["powerup"];

    constructor(width, x, y)
    {
        super(img.null, width, width, x, y);
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

    _powerupSpeed(ball)
    {
        let multiplier = 2;

        ball.speed *= multiplier;
        setTimeout(() => {
            ball.speed /= multiplier;
        }, this.#duration);
    }

    activatePowerup(ball)
    {
        if(this.#id === "speed") this._powerupSpeed(ball);

        this.#properties.push("inactive");
    }
}