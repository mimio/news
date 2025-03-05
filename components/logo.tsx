export default function Logo() {
  return (
    <div className="text-center my-4 select-none">
      <h1
        className="
          font-['Impact'] text-5xl uppercase
          inline-block
          bg-black text-white
          transform -skew-x-[20deg]
          relative
          px-3 py-1
        "
        style={{
          filter: "drop-shadow(-3px 0px 1px rgba(0,0,0,0.3))",
          textShadow: `
            -1px -1px 0 #000,
            1px -1px 0 #000,
            -1px 1px 0 #000,
            1px 1px 0 #000
          `,
        }}
      >
        GLOW REPORT
      </h1>
    </div>
  )
}

