import os


def read_file(file_path):
    with open(file_path, "r") as file:
        return file.read()


def embed_assets(html_file, static_folder, output_file):
    with open(html_file, "r") as file:
        html_content = file.read()

    script_tags = []
    for root, dirs, files in os.walk(static_folder):
        script_tags.extend(
            [
                f'<script src="static/{file}"></script>'
                for file in files
                if file.endswith(".js")
            ]
        )


    for script_tag in script_tags:
        js_filename = script_tag.split('"')[1].split("/")[-1]
        js_file_path = os.path.join(static_folder, js_filename)
        js_content = read_file(js_file_path)
        js_embed = f"<script>\n{js_content}\n</script>"
        html_content = html_content.replace(script_tag, js_embed)

    css_tag = '<link rel="stylesheet" type="text/css" href="static/style.css">'
    css_filename = css_tag.split('"')[5].split("/")[-1]
    css_file_path = os.path.join(static_folder, css_filename)
    css_content = read_file(css_file_path)
    css_embed = f"<style>\n{css_content}\n</style>"
    html_content = html_content.replace(css_tag, css_embed)

    with open(output_file, "w") as file:
        file.write(html_content)


if __name__ == "__main__":
    local_file_path = os.path.dirname(__file__)
    js_folder = "static"
    template_folder = "templates"
    html_file = "index.html"
    output_file = "notes.html"

    embed_assets(
        os.path.join(local_file_path, template_folder, html_file),
        os.path.join(local_file_path, js_folder),
        os.path.join(local_file_path, "../", output_file),
    )

    print(
        f"JavaScript files have been embedded into the full path: {os.path.join(local_file_path, '../', output_file)}"
    )
