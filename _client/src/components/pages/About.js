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
								MongoGin is a contact info manager app built with React,
								Redux, Node, Express JS and MongoDB database.
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default About;
