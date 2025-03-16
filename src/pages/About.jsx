const About = () => {
  return (
    <>
      <div className='flex flex-wrap gap-2 sm:gap-x-6 items-center justify-center'>
        <h1 className='text-4xl font-bold leading-none tracking-tight sm:text-6xl'>
          we love
        </h1>
        <div className='stats bg-accent shadow rounded-md'>
          <div className='stat'>
            <div className='state-title text-primary-content text-4xl font-bold tracking-widest'>
              confy
            </div>
          </div>
        </div>
      </div>
      <p className='mt-6 text-lg leading-8 max-w-2xl mx-auto'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo
        quidem pariatur laboriosam sequi ab, maxime quod nostrum nisi a
        consectetur facere repellat asperiores accusamus maiores expedita
        mollitia quisquam deserunt? Minus magnam ipsum quam. Ex nulla possimus
        atque amet alias aliquid?
      </p>
    </>
  );
};

export default About;
