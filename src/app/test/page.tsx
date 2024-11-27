import TableContainer from "@/components/TableContainer/TableContainer";

const Test = () => {
    return (
        <div className="bg-slate-200">
            <div className="max-w-4xl mx-auto px-4 py-8 bg-slate-200">
                <h1 className="text-3xl font-semibold text-center text-gray-500 mb-4">Welcome to the Test Page!</h1>

                <p className="text-lg text-gray-400 mb-6">
                    This page showcases the custom <strong className="text-blue-600">TableContainer</strong> component,
                    designed to display structured data in a table format. Below is an example of a data table rendered using
                    our custom table component.
                </p>

                <hr className="border-t-2 border-gray-300 mb-6" />

                <h2 className="text-2xl font-semibold text-gray-500 mb-4">Example Data Table</h2>
                <p className="text-lg text-gray-400 mb-6">
                    The table below displays sample data including names, ages, and occupations. You can easily modify or extend
                    this table with more features like sorting, filtering, and pagination. Feel free to explore how it can be adapted
                    for your own data.
                </p>

                <TableContainer />

                <hr className="border-t-2 border-gray-300 mt-6 mb-6" />

                <footer className="text-center text-sm text-gray-500">
                    <p>
                        This is a simple example of a custom table in React. You can add more features or customize the design further
                        based on your project requirements.
                    </p>
                </footer>
            </div>
        </div>
    );
};

export default Test;
