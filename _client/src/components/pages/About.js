import React from 'react';

const About = () => {
	return (
		<section className='about pt-5'>
			<div className='container pt-5'>
				<div className='row'>
					<div className='col-md-6'>
						<h2>ABOUT MONGOGIN</h2>
						<p className='mb-1'>
							<small>
								<strong>Version: </strong> 1.0.0
							</small>
						</p>
						<p className='mb-5'>
							<small>
								<strong>Developer: </strong> Cromuel Barut
							</small>
						</p>
						<div className='w-50-text'>
							<p>
								MongoGin login system is powered by React JS, Redux,
								Node, Express and MongoDB database. MongoGin is MongoDB
								+ Login, it's not a drink combo like C2Gin.
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default About;
