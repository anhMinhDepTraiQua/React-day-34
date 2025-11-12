
const DefaultLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <Outlet />
    
      {/* Bottom Navigation */}
      <Navigation />
    </div>
  );
};

export default DefaultLayout;
