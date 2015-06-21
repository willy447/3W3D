var Puck = function ()
{
    this.pos = new THREE.Vector3();
    this.vel = new THREE.Vector3();
    this.mesh = new THREE.Mesh(new THREE.CylinderGeometry(5, 5, 2, 32),
        new THREE.MeshBasicMaterial({
        	transparent: true,
        	opacity: 1.0
        }));
    this.pColor = new THREE.Color();
    this.pColor.setHSL (Math.random(), 0.7, 0.7);
    this.pointLight = new THREE.PointLight (this.pColor.getHex(), 1);
    this.mesh.material.color = this.pColor;
	
    this.ID = pID;
    pID++;
    pucks.push(this);

    scene.add (this.mesh);
    scene.add (this.pointLight);
	
		
};
Puck.prototype.update = function (dt)
{
    this.pos.add (this.vel.clone().multiplyScalar (dt));
    this.mesh.position.copy (this.pos);
    this.pointLight.position.set (this.pos.x, 10, this.pos.z);
    this.pointLight.color = this.pColor;
    this.mesh.material.color = this.pColor;
};
Puck.prototype.collision = function ()
{	
	
	
    if (this.pos.x > 100-2.5)
    {
        this.pos.x = 100-2.5;
        this.vel.set (-this.vel.x, 0, this.vel.z);
        this.pColor.setHSL (Math.random(), Math.random(), Math.random()/2+0.5);
    }
    else if (this.pos.x < -100+2.5)
    {
        this.pos.x = -100+2.5;
        this.vel.set (-this.vel.x, 0, this.vel.z);
        this.pColor.setHSL (Math.random(), Math.random(), Math.random()/2+0.5);
    }
    if (this.pos.z > 100-7.5)
    {
        if(this.pos.x < udx+21 && this.pos.x > udx-21)
		{
			this.pos.z = 100-7.5;
            this.vel.set (this.vel.x, 0, -this.vel.z);
            this.pColor.setHSL (Math.random(), Math.random(), Math.random()/2+0.5);
		}
		else if(this.pos.x < meshmove && this.pos.x > -1*meshmove && this.pos.z > 100-2.5)
        {    
            this.remove();
			overcount++;
        }
        else if(this.pos.z > 100-2.5)
        {
            this.pos.z = 100-2.5;
            this.vel.set (this.vel.x, 0, -this.vel.z);
            this.pColor.setHSL (Math.random(), Math.random(), Math.random()/2+0.5);
        }
    }
    else if (this.pos.z < -100+7.5)
    {
		if(this.pos.x < udx+21 && this.pos.x > udx-21)
		{
			this.pos.z = -100+7.5;
			this.vel.set (this.vel.x, 0, -this.vel.z);
			this.pColor.setHSL (Math.random(), Math.random(), Math.random()/2+0.5);
		}
		else if(this.pos.x < meshmove && this.pos.x > -1*meshmove && this.pos.z < -100+2.5)
        {    
            this.remove();
			overcount++;
        }
		else if(this.pos.z < -100+2.5)
		{
			this.pos.z = -100+2.5;
			this.vel.set (this.vel.x, 0, -this.vel.z);
			this.pColor.setHSL (Math.random(), Math.random(), Math.random()/2+0.5);
		}
    }
};
Puck.prototype.remove = function()
{
	scene.remove (this.mesh);
	scene.remove (this.pointLight);
	delete pucks[this.ID];
}