function Comment({ authorName, comment }) {
  return (
    <div style={{ background: 'var(--color-background-primary)' }} 
      className=" rounded-xl p-4 flex flex-col ">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 text-sm font-medium uppercase flex-shrink-0">
            {authorName.slice(0, 2)}
          </div>
          <div>
            <p className="text-sm font-medium capitalize">{authorName}</p>
            
          </div>
        </div>
        <button className="text-gray-400 hover:text-red-400 transition-colors">
          <i className="ti ti-trash text-base"></i>
        </button>
      </div>
      <p className="text-sm text-gray-700 leading-relaxed pl-12">{comment}</p>
    </div>
  )
}

export default Comment