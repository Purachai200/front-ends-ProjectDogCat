export default function Home() {
  return (
    <div className="min-h-0 flex justify-between items-center">
      <div className="container">
        <div className="container h-screen p-0 flex justify-center items-center">
          <div className="h-3/4 m-1 carousel carousel-vertical rounded-box">
            <div className="carousel-item h-full w-full">
              <img src="https://daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.jpg" />
            </div>
            <div className="carousel-item h-full w-full">
              <img src="https://daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.jpg" />
            </div>
            <div className="carousel-item h-full w-full">
              <img src="https://daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.jpg" />
            </div>
            <div className="carousel-item h-full w-full">
              <img src="https://daisyui.com/images/stock/photo-1494253109108-2e30c049369b.jpg" />
            </div>
            <div className="carousel-item h-full w-full">
              <img src="https://daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.jpg" />
            </div>
            <div className="carousel-item h-full w-full">
              <img src="https://daisyui.com/images/stock/photo-1559181567-c3190ca9959b.jpg" />
            </div>
            <div className="carousel-item h-full w-full">
              <img src="https://daisyui.com/images/stock/photo-1601004890684-d8cbf643f5f2.jpg" />
            </div>
          </div>
        </div>
      </div>
      <div className="container h-screen p-0 flex flex-col gap-8 justify-center items-center ">
        <div className="container h-44 w-5/6 outline outline-1 rounded-box p-2">
          <div className="text-3xl text-center">ปริมาณสุนัขที่ลงทะเบียน</div>
        </div>
        <div className="container h-44 w-5/6 outline outline-1 rounded-box p-2">
          <div className="text-3xl text-center">ปริมาณแมวที่ลงทะเบียน</div>
        </div>
        <div className="container h-44 w-5/6 outline outline-1 rounded-box p-2">
          <div className="text-3xl text-center">ปริมาณแมวที่ลงทะเบียน</div>
        </div>
      </div>
    </div>
  );
}
