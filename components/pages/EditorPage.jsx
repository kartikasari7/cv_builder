"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import TemplateRenderer from "@/components/cv/TemplateRenderer";

const emptyCvData = {
  name: "",
  role: "",
  email: "",
  phone: "",
  linkedin: "",
  portfolio: "",
  city: "",
  postalCode: "",
  photo: "",
  birthDate: "",
  military: "",
  headline: "",
  origin: "",
  nationality: "",
  politicalStatus: "",
  maritalStatus: "",
  summary: "",
  education: [],
  experience: [],
  organizations: [],
  certifications: [],
  awards: [],
  projects: [],
  courses: [],
  references: [],
  hobbies: [],
  languages: [],
  skills: [],
};

const allTabs = [
  { id: "biodata", label: "Biodata" },
  { id: "education", label: "Pendidikan" },
  { id: "experience", label: "Pengalaman" },
  { id: "organizations", label: "Organisasi" },
  { id: "certifications", label: "Sertifikasi" },
  { id: "awards", label: "Penghargaan" },
  { id: "projects", label: "Proyek" },
  { id: "courses", label: "Kursus" },
  { id: "references", label: "Referensi" },
  { id: "hobbies", label: "Hobi" },
  { id: "languages", label: "Bahasa" },
  { id: "skills", label: "Skill" },
];

const templateSections = {
  "minimal-ats": [
    "biodata",
    "education",
    "experience",
    "organizations",
    "certifications",
    "awards",
    "skills",
  ],

  "ats-2": [
    "biodata",
    "skills",
    "courses",
    "experience",
    "education",
    "references",
  ],

  "ats-3": [
    "biodata",
    "experience",
    "education",
    "skills",
    "languages",
    "references",
    "hobbies",
  ],

  "ats-4": [
    "biodata",
    "education",
    "experience",
    "projects",
    "certifications",
    "skills",
    "languages",
    "awards",
    "hobbies",
  ],

  "ats-5": [
    "biodata",
    "experience",
    "languages",
    "education",
    "skills",
    "hobbies",
  ],
  "ats-6": [
    "biodata",
    "education",
    "experience",
    "organizations",
    "skills",
    "awards",
    "hobbies",
  ],

  default: ["biodata", "education", "experience", "skills"],
};

export default function EditorPage() {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState("biodata");
  const [cvData, setCvData] = useState(emptyCvData);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [newSkill, setNewSkill] = useState("");

  useEffect(() => {
    const savedTemplate = localStorage.getItem("selectedTemplate");
    const savedDraft = localStorage.getItem("cvDraft");
    const savedUser = localStorage.getItem("user");

    if (savedTemplate) {
      try {
        setSelectedTemplate(JSON.parse(savedTemplate));
      } catch {
        setSelectedTemplate({
          id: "minimal-ats",
          name: "Minimal ATS",
          type: "ATS",
        });
      }
    } else {
      setSelectedTemplate({
        id: "minimal-ats",
        name: "Minimal ATS",
        type: "ATS",
      });
    }

    if (savedDraft) {
      try {
        const parsedDraft = JSON.parse(savedDraft);
        setCvData(normalizeCvData(parsedDraft));
        return;
      } catch {
        localStorage.removeItem("cvDraft");
      }
    }

    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);

        setCvData((prev) => ({
          ...prev,
          name: user.name || "",
          email: user.email || "",
          phone: user.phone || "",
          role: user.jobTitle || "",
          city: user.location || "",
          summary: user.about || "",
        }));
      } catch {
        setCvData(emptyCvData);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cvDraft", JSON.stringify(cvData));
  }, [cvData]);

  const activeSections = useMemo(() => {
    return templateSections[selectedTemplate?.id] || templateSections.default;
  }, [selectedTemplate]);

  const visibleTabs = useMemo(() => {
    return allTabs.filter((tab) => activeSections.includes(tab.id));
  }, [activeSections]);

  useEffect(() => {
    if (!activeSections.includes(activeTab)) {
      setActiveTab("biodata");
    }
  }, [activeSections, activeTab]);

  const cvScore = useMemo(() => {
    return calculateCvScore(cvData, activeSections);
  }, [cvData, activeSections]);

  const updateField = (key, value) => {
    setCvData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handlePhotoUpload = (file) => {
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    if (!allowedTypes.includes(file.type)) {
      alert("Format foto harus JPG, PNG, atau WEBP.");
      return;
    }

    const maxSize = 2 * 1024 * 1024;

    if (file.size > maxSize) {
      alert("Ukuran foto maksimal 2MB.");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setCvData((prev) => ({
        ...prev,
        photo: reader.result,
      }));
    };

    reader.readAsDataURL(file);
  };

  const addArrayItem = (key, item) => {
    setCvData((prev) => ({
      ...prev,
      [key]: [
        ...(prev[key] || []),
        {
          id: Date.now(),
          ...item,
        },
      ],
    }));
  };

  const updateArrayItem = (key, id, field, value) => {
    setCvData((prev) => ({
      ...prev,
      [key]: (prev[key] || []).map((item) =>
        item.id === id
          ? {
              ...item,
              [field]: value,
            }
          : item,
      ),
    }));
  };

  const deleteArrayItem = (key, id) => {
    setCvData((prev) => ({
      ...prev,
      [key]: (prev[key] || []).filter((item) => item.id !== id),
    }));
  };

  const addSkill = () => {
    if (!newSkill.trim()) return;

    setCvData((prev) => ({
      ...prev,
      skills: [
        ...(prev.skills || []),
        {
          id: Date.now(),
          name: newSkill.trim(),
        },
      ],
    }));

    setNewSkill("");
  };

  const handleSaveDraft = () => {
    localStorage.setItem("cvDraft", JSON.stringify(cvData));
    alert("CV berhasil disimpan.");
  };

  const handleReview = () => {
    localStorage.setItem("cvDraft", JSON.stringify(cvData));
    router.push("/preview");
  };

  const renderTabContent = () => {
    if (activeTab === "biodata") {
      const isATS2 = selectedTemplate?.id === "ats-2";
      const isATS3 = selectedTemplate?.id === "ats-3";
      const isATS4 = selectedTemplate?.id === "ats-4";
      const isATS5 = selectedTemplate?.id === "ats-5";
      const isATS6 = selectedTemplate?.id === "ats-6";

      return (
        <div className="editor-form-grid">
          <EditorInput
            label="Nama Lengkap"
            value={cvData.name}
            onChange={(value) => updateField("name", value)}
            placeholder={
              isATS6
                ? "张伟"
                : isATS5
                  ? "Helen Willis"
                  : isATS4
                    ? "김지은"
                    : isATS3
                      ? "Sherlock Holmes"
                      : isATS2
                        ? "Alexander Blake"
                        : "Baskara Antonio"
            }
          />

          <PhotoUploader
            label="Foto Profil"
            value={cvData.photo}
            onChange={handlePhotoUpload}
            onRemove={() => updateField("photo", "")}
          />

          {isATS4 && (
            <>
              <EditorInput
                label="Tanggal Lahir"
                value={cvData.birthDate}
                onChange={(value) => updateField("birthDate", value)}
                placeholder="1997.04.15"
              />

              <EditorInput
                label="Status Militer / Keterangan Tambahan"
                value={cvData.military}
                onChange={(value) => updateField("military", value)}
                placeholder="병역필 (2020.07~2022.01)"
              />

              <EditorInput
                label="Headline"
                value={cvData.headline}
                onChange={(value) => updateField("headline", value)}
                placeholder="성장하는 마케터, 김지은입니다."
                full
              />
            </>
          )}

          {isATS6 && (
            <>
              <EditorInput
                label="Tanggal Lahir"
                value={cvData.birthDate}
                onChange={(value) => updateField("birthDate", value)}
                placeholder="1997.05.20"
              />

              <EditorInput
                label="籍贯 / Asal"
                value={cvData.origin}
                onChange={(value) => updateField("origin", value)}
                placeholder="江苏 南京"
              />

              <EditorInput
                label="民族 / Etnis"
                value={cvData.nationality}
                onChange={(value) => updateField("nationality", value)}
                placeholder="汉族"
              />

              <EditorInput
                label="政治面貌 / Status Politik"
                value={cvData.politicalStatus}
                onChange={(value) => updateField("politicalStatus", value)}
                placeholder="中共党员"
              />

              <EditorInput
                label="婚姻状况 / Status Pernikahan"
                value={cvData.maritalStatus}
                onChange={(value) => updateField("maritalStatus", value)}
                placeholder="未婚"
              />
            </>
          )}

          <EditorInput
            label="Posisi / Jabatan Target"
            value={cvData.role}
            onChange={(value) => updateField("role", value)}
            placeholder={
              isATS6
                ? "市场营销专员"
                : isATS5
                  ? "Administrative Assistant"
                  : isATS4
                    ? "마케팅 / 신입"
                    : isATS3
                      ? "ATS Format Specialist"
                      : isATS2
                        ? "Data Engineer"
                        : "Legal and Compliance Officer"
            }
          />

          <EditorInput
            label="Email"
            type="email"
            value={cvData.email}
            onChange={(value) => updateField("email", value)}
            placeholder={
              isATS6
                ? "zhangwei@email.com"
                : isATS5
                  ? "helenwillis@gmail.com"
                  : isATS4
                    ? "kje0123@email.com"
                    : isATS3
                      ? "sherlock.holmes@detective.com"
                      : isATS2
                        ? "nblake.data@gmail.com"
                        : "baskaraantonio@gmail.com"
            }
          />

          <EditorInput
            label="No. Telepon"
            value={cvData.phone}
            onChange={(value) => updateField("phone", value)}
            placeholder={
              isATS6
                ? "138-0000-0000"
                : isATS5
                  ? "(917) 555-2381"
                  : isATS4
                    ? "010-1234-5678"
                    : isATS3
                      ? "+44 20 7224 3688"
                      : isATS2
                        ? "(737) 212-6384"
                        : "082389007652"
            }
          />

          <EditorInput
            label="LinkedIn"
            value={cvData.linkedin}
            onChange={(value) => updateField("linkedin", value)}
            placeholder={
              isATS6
                ? "linkedin.com/in/zhangwei"
                : isATS5
                  ? "linkedin.com/in/helen-willis"
                  : isATS4
                    ? "linkedin.com/in/kimjieun"
                    : isATS3
                      ? "www.linkedin.com/in/sherlockholmes"
                      : isATS2
                        ? "linkedin.com/in/alexander-blake"
                        : "linkedin.com/in/baskara antonio"
            }
          />

          <EditorInput
            label="Portfolio / Website"
            value={cvData.portfolio}
            onChange={(value) => updateField("portfolio", value)}
            placeholder={
              isATS6
                ? "portfolio.com/zhangwei"
                : isATS5
                  ? "portfolio.com/helenwillis"
                  : isATS4
                    ? "portfolio.com/kimjieun"
                    : isATS3
                      ? "www.twitter.com/sherlockholmes"
                      : isATS2
                        ? "portfolio.com"
                        : "suratplus.com"
            }
          />

          <EditorInput
            label={
              isATS2 || isATS3 || isATS5 || isATS6
                ? "Alamat / Lokasi"
                : "Lokasi"
            }
            value={cvData.city}
            onChange={(value) => updateField("city", value)}
            placeholder={
              isATS6
                ? "上海市浦东新区"
                : isATS5
                  ? "New York, USA"
                  : isATS4
                    ? "서울특별시 강남구 테헤란로 123"
                    : isATS3
                      ? "221B Baker Street, London, London, NW1 6XE, United Kingdom"
                      : isATS2
                        ? "301 Brazos Street, Austin"
                        : "Jakarta Selatan, Daerah Khusus Ibukota Jakarta"
            }
          />

          <EditorInput
            label="Kode Pos"
            value={cvData.postalCode}
            onChange={(value) => updateField("postalCode", value)}
            placeholder={
              isATS6
                ? "200120"
                : isATS5
                  ? "10001"
                  : isATS4
                    ? "06236"
                    : isATS3
                      ? "NW1 6XE"
                      : isATS2
                        ? "78701"
                        : "12560"
            }
          />

          <PointInput
            label="Ringkasan Profil"
            value={cvData.summary}
            onChange={(value) => updateField("summary", value)}
            placeholder={
              isATS6
                ? "具备良好的沟通能力和团队合作精神，熟悉市场调研与分析，致力于通过创新营销策略提升品牌影响力和业务增长。"
                : isATS5
                  ? "Experienced administrative professional with over 6 years supporting busy executives and keeping office operations running smoothly."
                  : isATS4
                    ? "데이터 기반 분석과 창의적인 아이디어로 브랜드의 가치를 높이는 마케터가 되고 싶습니다."
                    : isATS3
                      ? "A highly analytical and detail-oriented professional with a background in solving complex problems."
                      : isATS2
                        ? "Data Engineer with over 6 years of experience building reliable, scalable pipelines."
                        : "I am a law graduate student looking for opportunities in legal compliance."
            }
            addLabel="+ Tambah Kalimat"
            helper="Setiap baris akan digabung menjadi satu paragraf ringkasan di template CV."
            previewType="paragraph"
          />
        </div>
      );
    }

    if (activeTab === "education") {
      return (
        <EditorSection
          title="Pendidikan"
          emptyText="Belum ada data pendidikan."
          items={cvData.education}
          onAdd={() =>
            addArrayItem("education", {
              school: "",
              degree: "",
              gpa: "",
              period: "",
              location: "",
              desc: "",
            })
          }
          addLabel="+ Tambah Pendidikan"
          renderItem={(item, index) => (
            <FormCard
              key={item.id}
              title={`Pendidikan #${index + 1}`}
              onDelete={() => deleteArrayItem("education", item.id)}
            >
              <EditorInput
                label="Institusi"
                value={item.school}
                onChange={(value) =>
                  updateArrayItem("education", item.id, "school", value)
                }
                placeholder="Syiah Kuala University"
              />

              <EditorInput
                label="Jurusan / Gelar"
                value={item.degree}
                onChange={(value) =>
                  updateArrayItem("education", item.id, "degree", value)
                }
                placeholder="Bachelor Degree in Law"
              />

              <EditorInput
                label="IPK / GPA"
                value={item.gpa}
                onChange={(value) =>
                  updateArrayItem("education", item.id, "gpa", value)
                }
                placeholder="3.85/4.00"
              />

              <EditorInput
                label="Periode"
                value={item.period}
                onChange={(value) =>
                  updateArrayItem("education", item.id, "period", value)
                }
                placeholder="Aug 19 - Nov 23"
              />

              <EditorInput
                label="Lokasi"
                value={item.location}
                onChange={(value) =>
                  updateArrayItem("education", item.id, "location", value)
                }
                placeholder="Banda Aceh, Aceh"
              />

              <PointInput
                label="Aktivitas / Prestasi"
                value={item.desc}
                onChange={(value) =>
                  updateArrayItem("education", item.id, "desc", value)
                }
                placeholder="Head of Syiah Kuala Debating Club, 2019-2029"
                addLabel="+ Tambah Poin"
                helper="Setiap baris akan otomatis menjadi bullet di template CV."
                previewType="bullet"
              />
            </FormCard>
          )}
        />
      );
    }

    if (activeTab === "experience") {
      return (
        <EditorSection
          title="Pengalaman"
          emptyText="Belum ada pengalaman kerja."
          items={cvData.experience}
          onAdd={() =>
            addArrayItem("experience", {
              company: "",
              position: "",
              type: "",
              period: "",
              location: "",
              desc: "",
            })
          }
          addLabel="+ Tambah Pengalaman"
          renderItem={(item, index) => (
            <FormCard
              key={item.id}
              title={`Pengalaman #${index + 1}`}
              onDelete={() => deleteArrayItem("experience", item.id)}
            >
              <EditorInput
                label="Perusahaan"
                value={item.company}
                onChange={(value) =>
                  updateArrayItem("experience", item.id, "company", value)
                }
                placeholder="PT Bank Negara Indonesia"
              />

              <EditorInput
                label="Posisi"
                value={item.position}
                onChange={(value) =>
                  updateArrayItem("experience", item.id, "position", value)
                }
                placeholder="Legal and Compliance Officer"
              />

              <EditorInput
                label="Tipe"
                value={item.type}
                onChange={(value) =>
                  updateArrayItem("experience", item.id, "type", value)
                }
                placeholder="Full Time"
              />

              <EditorInput
                label="Periode"
                value={item.period}
                onChange={(value) =>
                  updateArrayItem("experience", item.id, "period", value)
                }
                placeholder="Jun 20 - Jul 23 (Present)"
              />

              <EditorInput
                label="Lokasi"
                value={item.location}
                onChange={(value) =>
                  updateArrayItem("experience", item.id, "location", value)
                }
                placeholder="Jakarta, Indonesia"
              />

              <PointInput
                label="Deskripsi Pekerjaan"
                value={item.desc}
                onChange={(value) =>
                  updateArrayItem("experience", item.id, "desc", value)
                }
                placeholder="Evaluated compliance processes and risk assessment goals to offer solutions."
                addLabel="+ Tambah Poin"
                helper="Setiap baris akan otomatis menjadi bullet di template CV."
                previewType="bullet"
              />
            </FormCard>
          )}
        />
      );
    }

    if (activeTab === "organizations") {
      return (
        <EditorSection
          title="Organisasi"
          emptyText="Belum ada pengalaman organisasi."
          items={cvData.organizations}
          onAdd={() =>
            addArrayItem("organizations", {
              org: "",
              role: "",
              period: "",
              location: "",
              desc: "",
            })
          }
          addLabel="+ Tambah Organisasi"
          renderItem={(item, index) => (
            <FormCard
              key={item.id}
              title={`Organisasi #${index + 1}`}
              onDelete={() => deleteArrayItem("organizations", item.id)}
            >
              <EditorInput
                label="Nama Organisasi"
                value={item.org}
                onChange={(value) =>
                  updateArrayItem("organizations", item.id, "org", value)
                }
                placeholder="ASEAN Youth Advocate Network (AYAN Indonesia)"
              />

              <EditorInput
                label="Jabatan / Peran"
                value={item.role}
                onChange={(value) =>
                  updateArrayItem("organizations", item.id, "role", value)
                }
                placeholder="Director for Research and Education"
              />

              <EditorInput
                label="Periode"
                value={item.period}
                onChange={(value) =>
                  updateArrayItem("organizations", item.id, "period", value)
                }
                placeholder="Apr 20 - Oct 21"
              />

              <EditorInput
                label="Lokasi"
                value={item.location}
                onChange={(value) =>
                  updateArrayItem("organizations", item.id, "location", value)
                }
                placeholder="Jakarta, Indonesia"
              />

              <PointInput
                label="Deskripsi Kegiatan"
                value={item.desc}
                onChange={(value) =>
                  updateArrayItem("organizations", item.id, "desc", value)
                }
                placeholder="Leading a team of 20 individuals from various regions in Indonesia."
                addLabel="+ Tambah Poin"
                helper="Setiap baris akan otomatis menjadi bullet di template CV."
                previewType="bullet"
              />
            </FormCard>
          )}
        />
      );
    }

    if (activeTab === "certifications") {
      return (
        <EditorSection
          title="Sertifikasi"
          emptyText="Belum ada sertifikasi."
          items={cvData.certifications}
          onAdd={() =>
            addArrayItem("certifications", {
              name: "",
              issuer: "",
              date: "",
              credential: "",
            })
          }
          addLabel="+ Tambah Sertifikasi"
          renderItem={(item, index) => (
            <FormCard
              key={item.id}
              title={`Sertifikasi #${index + 1}`}
              onDelete={() => deleteArrayItem("certifications", item.id)}
            >
              <EditorInput
                label="Nama Sertifikasi"
                value={item.name}
                onChange={(value) =>
                  updateArrayItem("certifications", item.id, "name", value)
                }
                placeholder="Certified Legal Compliance Professional (CLCP)"
              />

              <EditorInput
                label="Penerbit"
                value={item.issuer}
                onChange={(value) =>
                  updateArrayItem("certifications", item.id, "issuer", value)
                }
                placeholder="LBBH"
              />

              <EditorInput
                label="Nomor Sertifikat"
                value={item.credential}
                onChange={(value) =>
                  updateArrayItem(
                    "certifications",
                    item.id,
                    "credential",
                    value,
                  )
                }
                placeholder="CLCP0762"
              />

              <EditorInput
                label="Tahun / Tanggal"
                value={item.date}
                onChange={(value) =>
                  updateArrayItem("certifications", item.id, "date", value)
                }
                placeholder="2022"
              />
            </FormCard>
          )}
        />
      );
    }

    if (activeTab === "awards") {
      return (
        <EditorSection
          title="Penghargaan"
          emptyText="Belum ada penghargaan."
          items={cvData.awards}
          onAdd={() =>
            addArrayItem("awards", {
              name: "",
              organizer: "",
              year: "",
            })
          }
          addLabel="+ Tambah Penghargaan"
          renderItem={(item, index) => (
            <FormCard
              key={item.id}
              title={`Penghargaan #${index + 1}`}
              onDelete={() => deleteArrayItem("awards", item.id)}
            >
              <EditorInput
                label="Nama Penghargaan"
                value={item.name}
                onChange={(value) =>
                  updateArrayItem("awards", item.id, "name", value)
                }
                placeholder="1st place in the Constitutional Debate Competition"
              />

              <EditorInput
                label="Penyelenggara"
                value={item.organizer}
                onChange={(value) =>
                  updateArrayItem("awards", item.id, "organizer", value)
                }
                placeholder="DRP Republic of Indonesia"
              />

              <EditorInput
                label="Tahun"
                value={item.year}
                onChange={(value) =>
                  updateArrayItem("awards", item.id, "year", value)
                }
                placeholder="2021"
              />
            </FormCard>
          )}
        />
      );
    }

    if (activeTab === "projects") {
      return (
        <EditorSection
          title="Proyek"
          emptyText="Belum ada proyek."
          items={cvData.projects}
          onAdd={() =>
            addArrayItem("projects", {
              name: "",
              role: "",
              period: "",
              link: "",
              desc: "",
            })
          }
          addLabel="+ Tambah Proyek"
          renderItem={(item, index) => (
            <FormCard
              key={item.id}
              title={`Proyek #${index + 1}`}
              onDelete={() => deleteArrayItem("projects", item.id)}
            >
              <EditorInput
                label="Nama Proyek"
                value={item.name}
                onChange={(value) =>
                  updateArrayItem("projects", item.id, "name", value)
                }
                placeholder="Legal Document Management System"
              />

              <EditorInput
                label="Peran"
                value={item.role}
                onChange={(value) =>
                  updateArrayItem("projects", item.id, "role", value)
                }
                placeholder="Researcher / Developer"
              />

              <EditorInput
                label="Periode"
                value={item.period}
                onChange={(value) =>
                  updateArrayItem("projects", item.id, "period", value)
                }
                placeholder="2023"
              />

              <EditorInput
                label="Link"
                value={item.link}
                onChange={(value) =>
                  updateArrayItem("projects", item.id, "link", value)
                }
                placeholder="Opsional"
              />

              <PointInput
                label="Deskripsi Proyek"
                value={item.desc}
                onChange={(value) =>
                  updateArrayItem("projects", item.id, "desc", value)
                }
                placeholder="Built a web-based system to manage legal documents and case files."
                addLabel="+ Tambah Poin"
                helper="Setiap baris akan otomatis menjadi bullet di template CV."
                previewType="bullet"
              />
            </FormCard>
          )}
        />
      );
    }

    if (activeTab === "courses") {
      return (
        <EditorSection
          title="Kursus"
          emptyText="Belum ada kursus."
          items={cvData.courses}
          onAdd={() =>
            addArrayItem("courses", {
              name: "",
              institution: "",
              period: "",
              location: "",
            })
          }
          addLabel="+ Tambah Kursus"
          renderItem={(item, index) => (
            <FormCard
              key={item.id}
              title={`Kursus #${index + 1}`}
              onDelete={() => deleteArrayItem("courses", item.id)}
            >
              <EditorInput
                label="Nama Kursus"
                value={item.name}
                onChange={(value) =>
                  updateArrayItem("courses", item.id, "name", value)
                }
                placeholder="Data Engineering"
              />

              <EditorInput
                label="Institusi"
                value={item.institution}
                onChange={(value) =>
                  updateArrayItem("courses", item.id, "institution", value)
                }
                placeholder="University of Texas"
              />

              <EditorInput
                label="Periode"
                value={item.period}
                onChange={(value) =>
                  updateArrayItem("courses", item.id, "period", value)
                }
                placeholder="Feb 2022 – May 2022"
              />

              <EditorInput
                label="Lokasi"
                value={item.location}
                onChange={(value) =>
                  updateArrayItem("courses", item.id, "location", value)
                }
                placeholder="Austin"
              />
            </FormCard>
          )}
        />
      );
    }

    if (activeTab === "references") {
      return (
        <EditorSection
          title="Referensi"
          emptyText="Belum ada referensi."
          items={cvData.references}
          onAdd={() =>
            addArrayItem("references", {
              name: "",
              company: "",
              email: "",
              phone: "",
            })
          }
          addLabel="+ Tambah Referensi"
          renderItem={(item, index) => (
            <FormCard
              key={item.id}
              title={`Referensi #${index + 1}`}
              onDelete={() => deleteArrayItem("references", item.id)}
            >
              <EditorInput
                label="Nama Referensi"
                value={item.name}
                onChange={(value) =>
                  updateArrayItem("references", item.id, "name", value)
                }
                placeholder="Dr. John Watson"
              />

              <EditorInput
                label="Perusahaan / Relasi"
                value={item.company}
                onChange={(value) =>
                  updateArrayItem("references", item.id, "company", value)
                }
                placeholder="Self-Employed"
              />

              <EditorInput
                label="Email"
                value={item.email}
                onChange={(value) =>
                  updateArrayItem("references", item.id, "email", value)
                }
                placeholder="john.watson@doctor.com"
              />

              <EditorInput
                label="No. Telepon"
                value={item.phone}
                onChange={(value) =>
                  updateArrayItem("references", item.id, "phone", value)
                }
                placeholder="+44 20 7224 3689"
              />
            </FormCard>
          )}
        />
      );
    }

    if (activeTab === "hobbies") {
      return (
        <EditorSection
          title="Hobi"
          emptyText="Belum ada hobi."
          items={cvData.hobbies}
          onAdd={() =>
            addArrayItem("hobbies", {
              name: "",
            })
          }
          addLabel="+ Tambah Hobi"
          renderItem={(item, index) => (
            <FormCard
              key={item.id}
              title={`Hobi #${index + 1}`}
              onDelete={() => deleteArrayItem("hobbies", item.id)}
            >
              <EditorInput
                label="Nama Hobi"
                value={item.name}
                onChange={(value) =>
                  updateArrayItem("hobbies", item.id, "name", value)
                }
                placeholder="Playing Violin"
              />
            </FormCard>
          )}
        />
      );
    }

    if (activeTab === "languages") {
      return (
        <EditorSection
          title="Bahasa"
          emptyText="Belum ada bahasa."
          items={cvData.languages}
          onAdd={() =>
            addArrayItem("languages", {
              name: "",
              level: "",
            })
          }
          addLabel="+ Tambah Bahasa"
          renderItem={(item, index) => (
            <FormCard
              key={item.id}
              title={`Bahasa #${index + 1}`}
              onDelete={() => deleteArrayItem("languages", item.id)}
            >
              <EditorInput
                label="Bahasa"
                value={item.name}
                onChange={(value) =>
                  updateArrayItem("languages", item.id, "name", value)
                }
                placeholder="English"
              />

              <EditorInput
                label="Level / Persentase"
                value={item.level}
                onChange={(value) =>
                  updateArrayItem("languages", item.id, "level", value)
                }
                placeholder="100"
              />
            </FormCard>
          )}
        />
      );
    }

    if (activeTab === "skills") {
      const isATS3 = selectedTemplate?.id === "ats-3";

      return (
        <div>
          <div className="skill-input-row">
            <input
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") addSkill();
              }}
              placeholder={
                isATS3
                  ? "Contoh: Analytical Thinking: 95"
                  : "Tambah skill lalu tekan Enter"
              }
            />

            <button type="button" onClick={addSkill}>
              +
            </button>
          </div>

          {isATS3 && (
            <p className="editor-helper-text">
              Untuk ATS 3, tulis skill dengan format: Nama Skill: 95, atau Nama
              Skill: Expert.
            </p>
          )}

          {cvData.skills.length === 0 && (
            <div className="editor-empty">Belum ada skill.</div>
          )}

          <div className="skill-list">
            {cvData.skills.map((skill) => (
              <div className="skill-item" key={skill.id}>
                <div className="skill-top">
                  <strong>{skill.name}</strong>

                  <button
                    type="button"
                    onClick={() => deleteArrayItem("skills", skill.id)}
                  >
                    Hapus
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <main className="editor-page">
      <section className="editor-header">
        <div>
          <span>Buat CV</span>
          <h1>Edit Data CV</h1>
          <p>
            Lengkapi data CV Anda. Preview di sebelah kanan akan berubah secara
            otomatis sesuai template yang dipilih.
          </p>
        </div>

        <div className="editor-header-actions">
          <button
            type="button"
            className="editor-outline-btn"
            onClick={handleReview}
          >
            Review CV
          </button>

          <button
            type="button"
            className="editor-primary-btn"
            onClick={handleSaveDraft}
          >
            Simpan CV
          </button>
        </div>
      </section>

      <section className="editor-layout">
        <div className="editor-left">
          <div className="editor-template-info">
            <div>
              <span>Template Aktif</span>
              <strong>{selectedTemplate?.name || "Minimal ATS"}</strong>
            </div>

            <button type="button" onClick={() => router.push("/templates")}>
              Ganti
            </button>
          </div>

          <div className="editor-tabs">
            {visibleTabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                className={activeTab === tab.id ? "active" : ""}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="editor-form-card">{renderTabContent()}</div>
        </div>

        <aside className="editor-right">
          <div className="preview-toolbar">
            <div>
              <span>Preview Realtime</span>
              <strong>{selectedTemplate?.name || "Minimal ATS"}</strong>
            </div>

            <div className="score-pill">{cvScore}/100</div>
          </div>

          <div className="cv-preview-shell">
            <TemplateRenderer
              templateId={selectedTemplate?.id || "minimal-ats"}
              data={cvData}
            />
          </div>

          <div className="score-card">
            <h3>CV Score</h3>

            <div className="score-bar">
              <span style={{ width: `${cvScore}%` }} />
            </div>

            <p>
              {cvScore >= 80
                ? "CV sudah cukup kuat. Lanjutkan ke Review CV."
                : "Lengkapi data penting agar skor CV meningkat."}
            </p>
          </div>
        </aside>
      </section>
    </main>
  );
}

function normalizeCvData(data = {}) {
  return {
    ...emptyCvData,
    ...data,
    education: data.education || [],
    experience: data.experience || [],
    organizations: data.organizations || [],
    certifications: data.certifications || [],
    awards: data.awards || [],
    projects: data.projects || [],
    courses: data.courses || [],
    references: data.references || [],
    hobbies: data.hobbies || [],
    languages: data.languages || [],
    skills: data.skills || [],
  };
}

function EditorInput({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  full = false,
}) {
  return (
    <div className={full ? "editor-field editor-field-full" : "editor-field"}>
      <label>{label}</label>

      <input
        type={type}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
}

function PhotoUploader({ label, value, onChange, onRemove }) {
  return (
    <div className="editor-field editor-field-full">
      <label>{label}</label>

      <div className="photo-upload-box">
        <div className="photo-preview">
          {value ? (
            <img src={value} alt="Preview Foto Profil" />
          ) : (
            <span>Foto</span>
          )}
        </div>

        <div className="photo-upload-content">
          <input
            id="photo-upload-input"
            type="file"
            accept="image/png,image/jpeg,image/webp"
            onChange={(e) => onChange(e.target.files?.[0])}
          />

          <label htmlFor="photo-upload-input" className="photo-upload-btn">
            Upload Foto
          </label>

          {value && (
            <button
              type="button"
              className="photo-remove-btn"
              onClick={onRemove}
            >
              Hapus Foto
            </button>
          )}

          <p>
            Gunakan foto JPG, PNG, atau WEBP. Maksimal 2MB. Foto akan langsung
            muncul di template yang mendukung foto.
          </p>
        </div>
      </div>
    </div>
  );
}

function PointInput({
  label,
  value,
  onChange,
  placeholder,
  addLabel = "+ Tambah Poin",
  helper = "Tulis satu poin per baris.",
  previewType = "bullet",
}) {
  const points = getPointArray(value);

  const updatePoint = (index, nextValue) => {
    const nextPoints = [...points];
    nextPoints[index] = nextValue;
    onChange(nextPoints.join("\n"));
  };

  const addPoint = () => {
    onChange([...points, ""].join("\n"));
  };

  const removePoint = (index) => {
    const nextPoints = points.filter((_, itemIndex) => itemIndex !== index);
    onChange(nextPoints.join("\n"));
  };

  const visiblePoints = points.filter((item) => item.trim().length > 0);

  return (
    <div className="editor-field editor-field-full">
      <label>{label}</label>

      <div className="point-input-list">
        {points.map((point, index) => (
          <div className="point-input-row" key={index}>
            <span className="point-number">{index + 1}</span>

            <input
              value={point}
              onChange={(e) => updatePoint(index, e.target.value)}
              placeholder={
                index === 0 ? placeholder : "Tambahkan poin berikutnya"
              }
            />

            {points.length > 1 && (
              <button
                type="button"
                className="point-remove-btn"
                onClick={() => removePoint(index)}
              >
                Hapus
              </button>
            )}
          </div>
        ))}
      </div>

      <button type="button" className="point-add-btn" onClick={addPoint}>
        {addLabel}
      </button>

      <p className="editor-helper-text">{helper}</p>

      {visiblePoints.length > 0 && (
        <div className="bullet-preview">
          <span>Preview hasil:</span>

          {previewType === "paragraph" ? (
            <p>{visiblePoints.join(" ")}</p>
          ) : (
            <ul>
              {visiblePoints.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

function FormCard({ title, children, onDelete }) {
  return (
    <div className="form-card">
      <div className="form-card-header">
        <h3>{title}</h3>

        <button type="button" onClick={onDelete}>
          Hapus
        </button>
      </div>

      <div className="editor-form-grid">{children}</div>
    </div>
  );
}

function EditorSection({
  title,
  items,
  emptyText,
  onAdd,
  addLabel,
  renderItem,
}) {
  return (
    <div>
      <div className="section-editor-title">
        <h2>{title}</h2>

        <button type="button" onClick={onAdd}>
          {addLabel}
        </button>
      </div>

      {items.length === 0 && <div className="editor-empty">{emptyText}</div>}

      <div className="section-list">{items.map(renderItem)}</div>
    </div>
  );
}

function getPointArray(value = "") {
  const points = String(value)
    .split("\n")
    .map((item) => item.trim());

  if (points.length === 1 && points[0] === "") {
    return [""];
  }

  return points;
}

function splitBullets(text = "") {
  return String(text)
    .split("\n")
    .map((item) => item.replace(/^[-•]\s*/, "").trim())
    .filter((item) => item.length > 0);
}

function calculateCvScore(data, activeSections = []) {
  let score = 0;
  let maxScore = 0;

  const addScore = (condition, point, partialPoint = 0) => {
    maxScore += point;

    if (condition === true) {
      score += point;
    } else if (typeof condition === "number") {
      score += Math.min(condition, point);
    } else if (condition) {
      score += point;
    } else if (partialPoint > 0) {
      score += partialPoint;
    }
  };

  const summaryLength = data.summary?.trim().length || 0;

  addScore(data.name?.trim(), 8);
  addScore(data.role?.trim(), 6);

  if (data.email?.trim()) {
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email);
    addScore(emailValid, 8, 4);
  } else {
    addScore(false, 8);
  }

  if (data.phone?.trim()) {
    addScore(data.phone.trim().length >= 10, 6, 3);
  } else {
    addScore(false, 6);
  }

  addScore(data.city?.trim(), 4);
  addScore(data.postalCode?.trim(), 2);

  if (summaryLength >= 120) {
    addScore(true, 12);
  } else if (summaryLength >= 80) {
    addScore(9, 12);
  } else if (summaryLength >= 50) {
    addScore(6, 12);
  } else if (summaryLength > 0) {
    addScore(3, 12);
  } else {
    addScore(false, 12);
  }

  if (activeSections.includes("education")) {
    const education = data.education?.[0];

    addScore(data.education?.length > 0, 3);
    addScore(education?.school?.trim(), 4);
    addScore(education?.degree?.trim(), 4);
    addScore(education?.period?.trim(), 3);
    addScore(education?.location?.trim(), 2);
    addScore(education?.gpa?.trim() || education?.desc?.trim(), 2);
  }

  if (activeSections.includes("experience")) {
    const experience = data.experience?.[0];
    const descLength = experience?.desc?.trim().length || 0;
    const bulletCount = splitBullets(experience?.desc).length;

    addScore(data.experience?.length > 0, 4);
    addScore(experience?.company?.trim(), 4);
    addScore(experience?.position?.trim(), 4);
    addScore(experience?.period?.trim(), 3);
    addScore(experience?.location?.trim(), 2);

    if (descLength >= 150 && bulletCount >= 3) {
      addScore(true, 6);
    } else if (descLength >= 80 && bulletCount >= 2) {
      addScore(4, 6);
    } else if (descLength > 0) {
      addScore(2, 6);
    } else {
      addScore(false, 6);
    }
  }

  if (activeSections.includes("organizations")) {
    const organization = data.organizations?.[0];
    const bulletCount = splitBullets(organization?.desc).length;

    addScore(data.organizations?.length > 0, 3);
    addScore(organization?.org?.trim(), 3);
    addScore(organization?.role?.trim(), 3);
    addScore(organization?.period?.trim(), 2);
    addScore(bulletCount >= 2, 3, bulletCount > 0 ? 1 : 0);
  }

  if (activeSections.includes("certifications")) {
    const certificationCount =
      data.certifications?.filter((item) => item.name?.trim()).length || 0;

    if (certificationCount >= 3) {
      addScore(true, 6);
    } else if (certificationCount >= 2) {
      addScore(4, 6);
    } else if (certificationCount >= 1) {
      addScore(2, 6);
    } else {
      addScore(false, 6);
    }
  }

  if (activeSections.includes("awards")) {
    const awardCount =
      data.awards?.filter((item) => item.name?.trim()).length || 0;

    if (awardCount >= 2) {
      addScore(true, 4);
    } else if (awardCount >= 1) {
      addScore(2, 4);
    } else {
      addScore(false, 4);
    }
  }

  if (activeSections.includes("projects")) {
    const project = data.projects?.[0];
    const bulletCount = splitBullets(project?.desc).length;

    addScore(data.projects?.length > 0, 3);
    addScore(project?.name?.trim(), 3);
    addScore(project?.role?.trim(), 2);
    addScore(bulletCount >= 2, 4, bulletCount > 0 ? 2 : 0);
  }

  if (activeSections.includes("courses")) {
    const courseCount =
      data.courses?.filter((item) => item.name?.trim()).length || 0;

    if (courseCount >= 2) {
      addScore(true, 5);
    } else if (courseCount === 1) {
      addScore(3, 5);
    } else {
      addScore(false, 5);
    }
  }

  if (activeSections.includes("references")) {
    const referenceCount =
      data.references?.filter((item) => item.name?.trim()).length || 0;

    if (referenceCount >= 2) {
      addScore(true, 5);
    } else if (referenceCount === 1) {
      addScore(3, 5);
    } else {
      addScore(false, 5);
    }
  }

  if (activeSections.includes("hobbies")) {
    const hobbyCount =
      data.hobbies?.filter((item) => item.name?.trim()).length || 0;

    if (hobbyCount >= 3) {
      addScore(true, 4);
    } else if (hobbyCount >= 1) {
      addScore(2, 4);
    } else {
      addScore(false, 4);
    }
  }

  if (activeSections.includes("languages")) {
    const languageCount =
      data.languages?.filter((item) => item.name?.trim()).length || 0;

    if (languageCount >= 2) {
      addScore(true, 5);
    } else if (languageCount === 1) {
      addScore(3, 5);
    } else {
      addScore(false, 5);
    }
  }

  if (activeSections.includes("skills")) {
    const skillCount = data.skills?.length || 0;

    if (skillCount >= 6) {
      addScore(true, 10);
    } else if (skillCount >= 4) {
      addScore(8, 10);
    } else if (skillCount >= 2) {
      addScore(5, 10);
    } else if (skillCount >= 1) {
      addScore(2, 10);
    } else {
      addScore(false, 10);
    }
  }

  if (maxScore === 0) return 0;

  return Math.min(Math.round((score / maxScore) * 100), 100);
}
