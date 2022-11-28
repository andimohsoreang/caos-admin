const liveToast = document.getElementById("liveToast")
if (liveToast) {
    const toast = new bootstrap.Toast(liveToast)
    toast.show()
}