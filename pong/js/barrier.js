class Barrier extends Sprite
{
	#rotation;

	constructor(width, rotation, x, y, thickness)
	{
		let w, h;

		if(rotation === "horizontal")
		{
			w = width;
			h = thickness;
		}

		if(rotation === "vertical")
		{
			w = thickness;
			h = width;
		}

		super(img.null, w, h, x, y);
		this.#rotation = rotation;
	}

	get id() { return "barrier"; }

	get angle()
	{
		if(this.#rotation === "horizontal") return 0;
		if(this.#rotation === "vertical") return Math.PI/2;
	}

	get hitbox()
	{
		return new SAT.Box(new SAT.Vector(this.x, this.y), this.width, this.height).toPolygon();
	}
}