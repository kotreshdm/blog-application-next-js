export default function Home() {
  return (
    <div className='container mb-5'>
      <div className='row'>
        <div className='text-center'>
          <h1 className='display-1 fw-bold'>Next Blog</h1>
          <hr />
          <p className='lead'>
            Multi User Blogging Platform built using Next.js & React
          </p>
        </div>

        {/* <Tags /> */}

        {/* <div className='col-lg-6 offset-lg-3'>
          {blogs?.map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </div> */}

        {/* <Pagination page={page} totalPages={totalPages} /> */}
      </div>
    </div>
  );
}
