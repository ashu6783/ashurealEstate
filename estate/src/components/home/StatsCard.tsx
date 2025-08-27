const StatsCard = ({ value, label }: { value: string, label: string }) => {
  return (
    <div className="text-center p-4 bg-white bg-opacity-50 hover:bg-white rounded-xl transition-colors duration-300">
      <h2 className="text-4xl lg:text-5xl font-bold text-[#B8860B]">{value}</h2>
      <p className="text-lg font-medium mt-2 text-gray-700">{label}</p>
    </div>
  )
}

export default StatsCard
