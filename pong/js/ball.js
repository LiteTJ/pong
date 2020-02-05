class Ball extends Sprite
{
    #speed;
    #angle;
    #bounceFrameCounter = 0;
    #deltaBounce = 8;

    alive;

    constructor(radius, speed)
    {
        super(img.ball, radius*2, radius*2);
        this.#speed = speed;
        this.#angle = Math.random() * (-Math.PI + 2*Math.PI*0.3) - Math.PI*0.3;
    }

    get xCentre()
    {
        return this.x + this.width/2;
    }

    get yCentre()
    {
        return this.y + this.height/2;
    }

    get xVel()
    {
        return this.#speed * Math.cos(this.#angle);
    }

    get yVel()
    {
        return this.#speed * -Math.sin(this.#angle);
    }

    get hitbox()
    {
        return new SAT.Circle(new SAT.Vector(this.xCentre, this.yCentre), this.width/2);
    }

    _bounce(objectAngle)
    {
        this.#angle = 2 * objectAngle - this.#angle;
    }

    _checkCollision(box)
    {
        return SAT.testPolygonCircle(box.hitbox, this.hitbox);
    }

    collideWithPaddle(paddle)
    {
        if(this.#bounceFrameCounter > this.#deltaBounce)
        {
            this._bounce(paddle.angle);
            //Deviate angle a bit after each bounce with the paddle for variation
            this.#angle += Math.random() * 2*Math.PI*0.1 - Math.PI*0.1;

            this.#bounceFrameCounter = 0;
        }
    }

    init()
    {
        this.x = canvas.width/2 - this.width/2;
        this.y = canvas.height/4;
        this.alive = true;
    }

    tick(boxes)
    {
        this.x += this.xVel;
        this.y += this.yVel;

        this.#bounceFrameCounter++;

        //Checks collision with walls and ball bounces
        //Code prevents ball getting stuck in paddle
        boxes.forEach(box => {
            if(this._checkCollision(box))
            {
                if(box.properties.includes("harmful"))
                {
                    this.alive = false;
                }

                if(box.properties.includes("solid"))
                {
                    if(box.id === "paddle")
                    {
                        this.collideWithPaddle(box);
                    } else
                    {
                        this._bounce(box.angle);
                    }
                }
            }
        });
    }
}