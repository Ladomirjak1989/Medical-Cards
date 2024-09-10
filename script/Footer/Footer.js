class Footer {
    constructor() {
        this.footer = document.createElement("footer");
        this.footer.className = "bg-blue-800 text-white py-6";
        this.footer.id = "footer"

        // First row with main info
        const firstRow = document.createElement("div");
        firstRow.className = "container mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 px-4";

        // Column 1
        const helpInfo = document.createElement("div");
        helpInfo.innerHTML = `
            <h2 class="text-lg text-yellow-300 font-bold mb-2">MS Live - we're here to help</h2>
            <p>Monday to Friday: 8am to 8pm<br>
            Saturday: 9am to 5pm<br>
            Sunday: Closed<br>
            Bank holidays: Closed</p>
            <p class="mt-2 font-semibold">Freephone: <span class="underline hover:underline-offset-4 hover:text-gray-200 cursor-pointer">+(31) 60 700 501</span></p>
            <p class="font-semibold">From outside Netherlands: <span class="underline hover:underline-offset-4 hover:text-gray-200 cursor-pointer">+011 31 408 787 589</span></p>
        `;

        // Column 2 (Social Links)
        const socialLinks = document.createElement("div");
        socialLinks.innerHTML = `
            <ul>
                <li><span class="underline hover:underline-offset-4 hover:text-gray-200 cursor-pointer">Facebook</span></li>
                <li><span class="underline hover:underline-offset-4 hover:text-gray-200 cursor-pointer">Instagram</span></li>
                <li><span class="underline hover:underline-offset-4 hover:text-gray-200 cursor-pointer">TikTok</span></li>
                <li><span class="underline hover:underline-offset-4 hover:text-gray-200 cursor-pointer">YouTube</span></li>
                <li><span class="underline hover:underline-offset-4 hover:text-gray-200 cursor-pointer">LinkedIn</span></li>
                <li><span class="underline hover:underline-offset-4 hover:text-gray-200 cursor-pointer">Twitter</span></li>
            </ul>
        `;

        // Column 3 (Other Links)
        const otherLinks = document.createElement("div");
        otherLinks.innerHTML = `
            <ul>
                <li><span class="underline hover:underline-offset-4 hover:text-gray-200 cursor-pointer">Complaints and feedback</span></li>
                <li><span class="underline hover:underline-offset-4 hover:text-gray-200 cursor-pointer">Emergencies</span></li>
                <li><span class="underline hover:underline-offset-4 hover:text-gray-200 cursor-pointer">Cookie settings</span></li>
            </ul>
        `;

        // Append columns to the first row
        firstRow.append(helpInfo, socialLinks, otherLinks);

        // Second row with policies
        const secondRow = document.createElement("div");
        secondRow.className = "bg-blue-900 text-white py-4 mt-4";
        secondRow.innerHTML = `
            <div class="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
                <div class="space-x-4">
                    <span class="underline hover:underline-offset-4 hover:text-gray-200 cursor-pointer">Cookie statement</span>
                    <span class="underline hover:underline-offset-4 hover:text-gray-200 cursor-pointer">Accessibility</span>
                    <span class="underline hover:underline-offset-4 hover:text-gray-200 cursor-pointer">Privacy statement</span>
                    <span class="underline hover:underline-offset-4 hover:text-gray-200 cursor-pointer">Disclaimer</span>
                </div>
                <p class="mt-2 md:mt-0">© Medical Service 2024</p>
            </div>
        `;

        // Append rows to footer
        this.footer.append(firstRow, secondRow);
    }

    render() {
        // document.body.appendChild(this.footer);
        return this.footer
    }
}

export default new Footer();
