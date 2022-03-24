import com.azure.storage.blob.*;
import com.azure.storage.blob.models.*;
import java.io.*;
import java.util.Properties;

public class BlobStorageConnection {

    private static final String FILE_NAME = "db.config";
    private static final String PROPERTY_BLOB_ACCESS_KEY = "azure.blob.access.key";

    private String connectionString;
    private BlobContainerClient containerClient;

    /**
     * loads a connection to the blob storage
     */
    public BlobStorageConnection() {
        loadConnectionString();
    }

    /**
     * loads the access key from the properties file
     */
    private void loadConnectionString() {
        FileInputStream file = null;
        try {
            // Get credentials
            file = new FileInputStream(FILE_NAME);
            Properties properties = new Properties();
            properties.load(file);
            String accessKey = properties.getProperty(PROPERTY_BLOB_ACCESS_KEY);
            connectionString = "DefaultEndpointsProtocol=https;AccountName=lolbets;AccountKey=" + accessKey + "==;EndpointSuffix=core.windows.net";
        } catch(Exception e) {
            System.out.println(e);
        }
    }

    /**
     * Creates a new container for things you want to store on the blob storage
     * @param containerName name of container you want to create
     */
    public void createBlobContainer(String containerName) {
        // Create a BlobServiceClient object which will be used to create a container client
        BlobServiceClient blobServiceClient = new BlobServiceClientBuilder().connectionString(connectionString).buildClient();

        // Create the container and return a container client object
        containerClient = blobServiceClient.createBlobContainer(containerName);
    }

    /**
     * Connect to an already created container on the blob storage
     * @param containerName name of the container you want to connect to
     */
    public void connectBlobContainer(String containerName) {
        // Create a BlobServiceClient object which will be used to create a container client
        BlobServiceClient blobServiceClient = new BlobServiceClientBuilder().connectionString(connectionString).buildClient();

        // Create the container and return a container client object
        containerClient = blobServiceClient.getBlobContainerClient(containerName);
    }

    /**
     * Uploads a file to the container you are connected to
     * @param name  path / name of the file you want to upload
     * @return The url of where the blob was uploaded
     * @throws Exception if the container client is not set first
     */
    public String uploadBlob(String name) throws Exception {
        if (this.containerClient == null) {
            throw new Exception("Must connect to container client first");
        }
        // Get a reference to a blob
        BlobClient blobClient = containerClient.getBlobClient(name);

        System.out.println("\nUploading to Blob storage as blob:\n\t" + blobClient.getBlobUrl());

        // Upload the blob
        blobClient.uploadFromFile(name);

        return blobClient.getBlobUrl();
    }

    /**
     * THIS DOES NOT WORK YET!
     * @param name path / name of the file you want to download
     * @throws Exception if the container client is not set first
     */
    public void downloadBlob(String name) throws Exception {
        if (this.containerClient == null) {
            throw new Exception("Must connect to container client first");
        }

        // Get a reference to a blob
        BlobClient blobClient = containerClient.getBlobClient(name);

        System.out.println("\nDownloading blob to\n\t " + name);

        new File("test/" + name);

        // Download the blob
        blobClient.downloadToFile("test/" + name);
    }

    /**
     * lists all the blobs in the current container
     */
    public void listAllBlobsInContainer() {
        // List the blob(s) in the container.
        for (BlobItem blobItem : containerClient.listBlobs()) {
            System.out.println("\t" + blobItem.getName());
        }
    }

    /**
     * Deletes your current container (and all the contents
     */
    public void deleteContainer() {
        containerClient.delete();
    }
}
