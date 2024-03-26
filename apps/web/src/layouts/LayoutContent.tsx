import { type FormEvent } from 'react';

export const LayoutContent = () => {
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    console.log(formData.get('email')); // Send the Email to DB
  };
  return (
    <div className="px-16 mt-16 pt-12">
      <h1
        className="text-5xl bg-gradient-to-r text-transparent bg-clip-text
            from-teal-500 via-teal-300 to-teal-500
            font-bold pb-1 ml-14"
      >
        Coming Soon<text className="animate-pulse text-sky-500">...</text>{' '}
        <br />
        <text
          className="ml-8 bg-gradient-to-r from-sky-500 via-sky-300 to-sky-500
                text-transparent bg-clip-text"
        >
          Stay Tuned!
        </text>
      </h1>
      <br />
      <br />
      <h4 className="text-green-600 absolute">
        Be one of the first few ones to get notified when the site goes live!
      </h4>

      <form onSubmit={submit} className="inline-flex mt-16 ml-5">
        <input
          type="email"
          id="email"
          name="email"
          autoComplete="email"
          required
          placeholder="youremail@gmail.com"
          className="outline-none p-4 mt-2 w-[280px] rounded-2xl"
        />
        <button
          className="bg-gradient-to-b from-teal-400 to-teal-300 cursor-pointer 
                border px-6 py-0 text-white font-semibold rounded-2xl 
                text-nowrap mt-2 ml-4 "
        >
          Notify Me
        </button>
      </form>
    </div>
  );
};
