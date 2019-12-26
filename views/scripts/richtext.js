var quill = new Quill("#editor", {
  modules: {
    toolbar: [
      ["bold", "italic"],
      ["link", "blockquote", "code-block", "image"],
      [{ list: "ordered" }, { list: "bullet" }]
    ]
  },
  placeholder: "Yaz gelsin...",
  theme: "snow"
});

var form = document.querySelector("form");
form.onsubmit = function() {
  // Populate hidden form on submit
  var about = document.querySelector("input[name=content]");
  about.value = JSON.stringify(quill.getContents());
  console.log("Submitted", $(form).serialize(), $(form).serializeArray());

  // No back end to actually submit to!
  alert("Bisiler calismadi! Kesin sorun sende!");
  return false;
};
