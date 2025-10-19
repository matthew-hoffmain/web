/**
 * Utility function to fetch multiple markdown files from a directory
 * @param {string} directory - The directory name to discover files in
 * @param {string} basePath - The base path for fetching files (optional, defaults to /static/pages/{directory})
 * @returns {Promise<Object>} - Object with file paths as keys and content as values
 */
export const fetchMarkdownFiles = async (directory, basePath = null) => {
    const actualBasePath = basePath || `/static/pages/${directory}`;

    try {
        // First, discover all markdown files in the directory
        const discoveryResponse = await fetch(`/api/discover-markdown/${directory}`);
        const discoveryData = await discoveryResponse.json();

        if (!discoveryResponse.ok) {
            console.error('Error discovering files:', discoveryData.error);
            return {};
        }

        const filePaths = discoveryData.files;
        console.log('Discovered markdown files:', filePaths);

        const messagePromises = filePaths.map(async (filePath) => {
            try {
                const response = await fetch(`${actualBasePath}/${filePath}`);
                const content = await response.text();
                return { path: filePath, content };
            } catch (error) {
                console.error(`Error fetching ${filePath}:`, error);
                return { path: filePath, content: '' };
            }
        });

        const results = await Promise.all(messagePromises);
        return results.reduce((acc, { path, content }) => {
            acc[path] = content;
            return acc;
        }, {});
    } catch (error) {
        console.error('Error in fetchMarkdownFiles:', error);
        return {};
    }
};

/**
 * Utility function to fetch a single markdown file
 * @param {string} filePath - The path to the markdown file
 * @returns {Promise<string>} - The content of the file
 */
export const fetchSingleMarkdownFile = async (filePath) => {
    try {
        const response = await fetch(filePath);
        return await response.text();
    } catch (error) {
        console.error(`Error fetching ${filePath}:`, error);
        return '';
    }
};
