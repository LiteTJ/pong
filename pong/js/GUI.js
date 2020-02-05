class GUI
{
    static drawGameOver()
    {
        ctx.save();

        ctx.font = "48px Trebuchet MS";
        ctx.fillStyle = "#0000ff";
        ctx.textAlign = "center";
        ctx.fillText("GAME OVER", canvas.width/2, canvas.height*0.4);

        ctx.font = "24px Trebuchet MS";
        ctx.fillText("space to restart", canvas.width/2, canvas.height*0.6);

        ctx.restore();
    }
}