
// import blurFlameLeft from "./../blur-flame.png";
// import blurFlameRight from "./../blur-flame2.png";

const ContactForm = () => {
    return (
        <div>
         <section id="contact" className="relative overflow-hidden py-10 md:py-28 bg-black">
        {/* <img
          src={blurFlameLeft}
          alt="Decorative blur"
          className="pointer-events-none absolute -left-24 top-10 w-96 opacity-70 blur-2xl"
        />
        <img
          src={blurFlameRight}
          alt="Decorative blur"
          className="pointer-events-none absolute -right-20 bottom-10 w-[26rem] opacity-60 blur-2xl"
        /> */}
        <div className="relative mx-auto max-w-5xl px-6">
          <div className="hero-font text-center">
            <h2 className="text-3xl font-semibold text-white sm:text-4xl">
              Contact Us
            </h2>
            <p className="mt-4 text-base text-white/70 sm:text-lg">
              We&apos;d love to hear from you! Whether you&apos;re an artist,
              influencer, radio or TV partner, or just someone curious about
              what we do — we&apos;re always open to questions, feedback, and
              collaboration ideas.
            </p>
          </div>

          <div className="mt-10 flex flex-col items-center justify-center gap-8 sm:flex-row sm:gap-12">
            <div className="flex items-center gap-3 text-left">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f5b640] text-black">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M2 5.75A2.75 2.75 0 0 1 4.75 3h14.5A2.75 2.75 0 0 1 22 5.75v12.5A2.75 2.75 0 0 1 19.25 21H4.75A2.75 2.75 0 0 1 2 18.25V5.75Zm2.75-.25a.25.25 0 0 0-.25.25v.44l9.26 5.23a.75.75 0 0 0 .72 0L21.5 6.19v-.44a.25.25 0 0 0-.25-.25H4.75Zm14.5 14.5A.25.25 0 0 0 19.5 20H4.75a.25.25 0 0 0-.25.25V8.3l7.76 4.38a2.25 2.25 0 0 0 2.18 0l7.81-4.41v11.98Z" />
                </svg>
              </span>
              <div>
                <p className="text-sm font-semibold text-white/80">Email</p>
                <p className="text-sm text-[#f5b640]">audorasounds@gmail.com</p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-left">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f0a71e]/90 text-black">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="m15.01 2.99 1.88-.95a1.75 1.75 0 0 1 2.24.62l1.48 2.32a1.75 1.75 0 0 1-.11 2.05l-2.07 2.59c-.3.38-.75.6-1.23.6h-.31c-.57 0-1.12-.2-1.55-.58l-1.16-1.01a.75.75 0 0 0-1.08.08c-.62.76-1.37 1.6-2.24 2.47-.87.87-1.7 1.62-2.47 2.23a.75.75 0 0 0-.08 1.08l1.01 1.16c.37.42.58.97.58 1.54v.31c0 .48-.21.93-.6 1.23l-2.6 2.07a1.75 1.75 0 0 1-2.04.11L3 20.87a1.75 1.75 0 0 1-.62-2.24l.95-1.88c.28-.56.78-.98 1.37-1.18 1.97-.67 4.16-2.14 6.57-4.55 2.41-2.41 3.88-4.6 4.55-6.57.2-.6.62-1.1 1.18-1.37Z" />
                </svg>
              </span>
              <div>
                <p className="text-sm font-semibold text-white/80">
                  Phone number
                </p>
                <p className="text-sm text-[#f5b640]">
                 +(234) 708 - 707 - 7113 
                </p>
              </div>
            </div>
          </div>

          <form className="mt-12 space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <label className="flex flex-col text-sm text-white/70">
                Name
                <input
                  type="text"
                  placeholder="Enter first and last name"
                  className="mt-2 rounded-[9px] border border-white/10 bg-white/5 px-5 py-4 text-base text-white placeholder-white/40 focus:border-[#f5b640] focus:outline-none focus:ring-2 focus:ring-[#f5b640]/40"
                />
              </label>
              <label className="flex flex-col text-sm text-white/70">
                Email
                <input
                  type="email"
                  placeholder="Enter email"
                  className="mt-2 rounded-[9px] border border-white/10 bg-white/5 px-5 py-4 text-base text-white placeholder-white/40 focus:border-[#f5b640] focus:outline-none focus:ring-2 focus:ring-[#f5b640]/40"
                />
              </label>
            </div>

            <label className="flex flex-col text-sm text-white/70">
              Message
              <textarea
                rows={6}
                placeholder="Enter message"
                className="mt-2 rounded-[9px] border border-white/10 bg-white/5 px-5 py-4 text-base text-white placeholder-white/40 focus:border-[#f5b640] focus:outline-none focus:ring-2 focus:ring-[#f5b640]/40"
              />
            </label>

            <div className="flex justify-end">
              <button
                type="submit"
                className="rounded-[9px] bg-gradient-to-r from-[#f6c15b] via-[#f0a71e] to-[#d78919] px-10 py-3 text-sm font-semibold text-black shadow-[0_15px_40px_rgba(214,137,25,0.35)] transition-transform duration-200 hover:scale-[1.03] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f6c15b]/50"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </section>
        </div>
    );
};

export default ContactForm;
